<template>
  <h1>Matches</h1>
  <v-row>
    <v-col>
      <form>
        <v-text-field
          v-model="state.description"
          :error-messages="(v$.description.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Description"
          required
          @input="v$.description.$touch"
          @blur="v$.description.$touch"
        ></v-text-field>

      <v-select
          v-model="state.winnerTeamId"
          :items="teams"
          :error-messages="(v$.winnerTeamId.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Winner Team"
          required
          item-title="name"
          item-value="id"
          @change="v$.winnerTeamId.$touch"
          @blur="v$.winnerTeamId.$touch"
          variant="outlined"
      ></v-select>

      <v-select
          v-model="state.roundId"
          :items="rounds"
          :error-messages="(v$.roundId.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Round"
          required
          item-title="description"
          item-value="id"
          @change="v$.roundId.$touch"
          @blur="v$.roundId.$touch"
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
        :items="matches"
        :headers="headers"
        class="elevation-1"
        item-key="name"
        items-per-page="5"
      >
        <template v-slot:headers>
          <tr>
            <th v-for="header in headers" :key="header.text">
              {{ header.text }}
            </th>
          </tr>
        </template>
        <template v-slot:[`item.action`]="{ item }">
          <v-btn @click="editMatch(item)" color="warning"> edit </v-btn>
          <v-btn @click="deleteMatch(item.id)" color="error"> delete </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>

  
<script setup lang="ts">
  import { reactive, toRaw } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required, numeric } from '@vuelidate/validators';
  import { onMounted } from 'vue';
  import { computed } from '@vue/reactivity';
  import { useMatchesStore } from '../stores/matchStore';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';
  import { MatchRequestDto } from '../models/matchRequestDto';
  import { useTeamsStore } from '../../teams/stores/teamStore';
  import { useRoundsStore } from '../../rounds/stores/roundStore';
  import { mustBeGreaterThan0 } from '../../../core/utils/functions';
  import { Match } from '../models/match';
  
  const matchesStore = useMatchesStore();
  const matches = computed(() => matchesStore.matches);
  const teamsStore = useTeamsStore();
  const teams = computed(() => toRaw(teamsStore.teams));
  const roundsStore = useRoundsStore();
  const rounds = computed(() => toRaw(roundsStore.rounds));
  const headers = [
    { text: 'Id',             value: 'id' },
    { text: 'Description',    value: 'description' },
    { text: 'Winner Team Id', value: 'winnerTeamId' },
    { text: 'Round Id',       value: 'roundId' },
    { text: 'Has winner ?',   value: 'hasWinner' },
    { text: 'Actions',        value: 'action' },
  ];
  const initialState = {
    description: '',
    winnerTeamId: 0,
    roundId: 0,
    hasWinner: false
  };
  
  const state = reactive({
    ...initialState,
  });
  
  const rules = {
    description:  { required },
    winnerTeamId: { required, numeric, mustBeGreaterThan0 },
    roundId:      { required, mustBeGreaterThan0, numeric },
    hasWinner:    { required },
  };
  
  const v$ = useVuelidate(rules, state);
  let matchId = 0;

  onMounted(async () => {
    await matchesStore.getAll;
    await teamsStore.getAll;
    await roundsStore.getAll;
  });
  
  async function submit() {
    const result = await v$.value.$validate();
    const request: MatchRequestDto = {
      description: "",
      winnerTeamId: 0,
      roundId: 0,
      hasWinner: false
    };
    
    if (result) {
      request.description  = state.description;
      request.winnerTeamId = state.winnerTeamId;
      request.roundId      = state.roundId;
      request.hasWinner    = state.hasWinner;

      if (matchId !== 0){
        await matchesStore.updateMatch(matchId, request);
        matchId = 0; 
      }
      else
        await matchesStore.addMatch(request);

      await matchesStore.getAll;
      clear();
    }
    else alert("Validation form failed!");
  }

  async function editMatch(match: Match) {
    state.description  = match.description;
    state.winnerTeamId = match.winnerTeamId;
    state.roundId      = match.roundId;
    state.hasWinner    = match.hasWinner;
    matchId            = match.id;
  }

  async function deleteMatch(id: number) {
    await matchesStore.removeMatch(id);
  }
  
  function clear() {
    v$.value.$reset();
    state.description  = "";
    state.winnerTeamId = 0;
    state.roundId      = 0;
    state.hasWinner    = false;
  }
</script>
