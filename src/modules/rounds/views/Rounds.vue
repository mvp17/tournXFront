<template>
    <h1>Rounds</h1>
    <v-row>
      <v-col>
        <form>
          <v-text-field
            v-model="state.bestOf"
            :error-messages="(v$.bestOf.$errors as VuelidateError[]).map((e) => e.$message)"
            :counter="10"
            label="Best of"
            required
            @input="v$.bestOf.$touch"
            @blur="v$.bestOf.$touch"
          ></v-text-field>
  
          <v-text-field
            v-model="state.numTeams"
            :error-messages="(v$.numTeams.$errors as VuelidateError[]).map((e) => e.$message)"
            :counter="10"
            label="Number of teams"
            required
            @input="v$.numTeams.$touch"
            @blur="v$.numTeams.$touch"
          ></v-text-field>

        <v-select
            v-model="state.winnerTeamId"
            :items="teams"
            :error-messages="(v$.winner.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Winner Team"
            required
            @change="v$.winner.$touch"
            @blur="v$.winner.$touch"
            variant="outlined"
        ></v-select>

        <v-select
            v-model="state.rivals"
            :items="rivals"
            :error-messages="(v$.rivals.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Rivals"
            multiple
            required
            @change="v$.rivals.$touch"
            @blur="v$.rivals.$touch"
            variant="outlined"
        ></v-select>

        <v-select
            v-model="state.nextRoundId"
            :items="nextRounds"
            :error-messages="(v$.nextRound.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Next Round"
            required
            @change="v$.nextRound.$touch"
            @blur="v$.nextRound.$touch"
            variant="outlined"
        ></v-select>

        <v-select
            v-model="state.tournamentId"
            :items="tournaments"
            :error-messages="(v$.tournament.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Tournament"
            required
            @change="v$.tournament.$touch"
            @blur="v$.tournament.$touch"
            variant="outlined"
        ></v-select>
  
          <v-checkbox
            v-model="state.hasWinner"
            :error-messages="(v$.hasWinner.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Has a winner?"
            required
            @input="v$.hasWinner.$touch"
            @blur="v$.hasWinner.$touch"
          ></v-checkbox>
  
          <v-btn color="success" class="me-4" @click="submit"> submit </v-btn>
          <v-btn color="error" @click="clear"> clear </v-btn>
        </form>
      </v-col>
      <v-col>
        <v-data-table
          :items="rounds"
          class="elevation-1"
          item-key="name"
          items-per-page="5"
        ></v-data-table>
      </v-col>
    </v-row>
</template>

  
<script setup lang="ts">
  import { reactive } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required, numeric } from '@vuelidate/validators';
  import { onMounted } from 'vue';
  import { computed } from '@vue/reactivity';
  import { useRoundsStore } from '../stores/roundStore';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';
  import { RoundRequestDto } from '../models/roundRequestDto';
  
  const roundsStore = useRoundsStore();
  const rounds = computed(() => roundsStore.rounds);

  const teams = [1, 2, 3, 4];
  const rivals = [5, 22, 13, 74];
  const nextRounds = [11, 12, 13, 14];
  const tournaments = [100, 200, 300, 400];
  
  const initialState = {
    bestOf: 0,
    numTeams: 0,
    winnerTeamId: 0,
    rivals: [],
    nextRoundId: 0,
    tournamentId: 0,
    hasWinner: false
  };
  
  const state = reactive({
    ...initialState,
  });
  
  const rules = {
    bestOf: { required, numeric },
    numTeams: { required, numeric },
    winnerTeamId: { required, numeric },
    rivals: { required },
    nextRoundId: { required, numeric },
    tournamentId: { required, numeric },
    hasWinner: { required },
  };
  
  const v$ = useVuelidate(rules, state);
  
  onMounted(() => {
    getRounds();
  });
  
  async function submit() {
    const result = await v$.value.$validate();
    const request: RoundRequestDto = {
      bestOf: 0,
      numTeams: 0,
      winnerTeamId: 0,
      rivals: [],
      nextRoundId: 0,
      tournamentId: 0,
      hasWinner: false
    };
    if (result) {
      request.bestOf = state.bestOf;
      request.hasWinner = state.hasWinner;
      request.nextRoundId = state.nextRoundId;
      request.numTeams = state.numTeams;
      request.rivals = state.rivals;
      request.tournamentId = state.tournamentId;
      request.winnerTeamId = state.winnerTeamId;
      roundsStore.addRound(request);
    }
    else alert("Validation form failed!");
  }
  
  function getRounds() {
    roundsStore.getAll;
  }
  
  function clear() {
    v$.value.$reset();
    state.bestOf = 0;
    state.hasWinner = false;
    state.nextRoundId = 0;
    state.numTeams = 0;
    state.rivals = [];
    state.tournamentId = 0;
    state.winnerTeamId = 0;
  }
</script>
