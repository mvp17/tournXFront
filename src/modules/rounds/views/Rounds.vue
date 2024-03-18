<template>
    <h1>Rounds</h1>
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

          <v-text-field
            v-model.number="state.bestOf"
            :error-messages="(v$.bestOf.$errors as VuelidateError[]).map((e) => e.$message)"
            :counter="10"
            label="Best of"
            required
            type="number"
            @input="v$.bestOf.$touch"
            @blur="v$.bestOf.$touch"
          ></v-text-field>
  
          <v-text-field
            v-model.number="state.numTeams"
            :error-messages="(v$.numTeams.$errors as VuelidateError[]).map((e) => e.$message)"
            :counter="10"
            label="Number of teams"
            required
            type="number"
            @input="v$.numTeams.$touch"
            @blur="v$.numTeams.$touch"
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
            v-model="state.rivals"
            :items="teams"
            :error-messages="(v$.rivals.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Rivals"
            multiple
            required
            item-title="name"
            item-value="id"
            @change="v$.rivals.$touch"
            @blur="v$.rivals.$touch"
            variant="outlined"
          ></v-select>

          <v-select
            v-model="state.nextRoundId"
            :items="rounds"
            :error-messages="(v$.nextRoundId.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Next Round"
            required
            item-title="description"
            item-value="id"
            @change="v$.nextRoundId.$touch"
            @blur="v$.nextRoundId.$touch"
            variant="outlined"
          ></v-select>

          <v-select
            v-model="state.tournamentId"
            :items="tournaments"
            :error-messages="(v$.tournamentId.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Tournament"
            required
            item-title="name"
            item-value="id"
            @change="v$.tournamentId.$touch"
            @blur="v$.tournamentId.$touch"
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
          :headers="headers"
          :hover="true"
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
            <v-btn @click="editRound(item)" color="warning"> edit </v-btn>
            <v-btn @click="deleteRound(item.id)" color="error"> delete </v-btn>
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
  import { useRoundsStore } from '../stores/roundStore';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';
  import { RoundRequestDto } from '../models/roundRequestDto';
  import { useTeamsStore } from '../../teams/stores/teamStore';
  import { mustBeGreaterThan0 } from '../../../core/utils/functions';
  import { useTournamentsStore } from '../../tournaments/stores/tournamentStore';
import { Round } from '../models/round';
  
  const roundsStore = useRoundsStore();
  const rounds = computed(() => toRaw(roundsStore.rounds));
  const teamsStore = useTeamsStore();
  const teams = computed(() => toRaw(teamsStore.teams));
  const tournamentsStore = useTournamentsStore();
  const tournaments = computed(() => toRaw(tournamentsStore.tournaments));
  const headers = [
    { text: 'Id',             value: 'id'},
    { text: 'Description',    value: 'description'},
    { text: 'Best Of',        value: 'bestOf'},
    { text: 'Num Teams',      value: 'numTeams'},
    { text: 'Winner Team Id', value: 'winnerTeamId'},
    { text: 'Rivals',         value: 'rivals'},
    { text: 'Next Round Id',  value: 'nextRoundId'},
    { text: 'Tournament Id',  value: 'tournamentId'},
    { text: 'Has winner ?',   value: 'hasWinner'},
    { text: 'Actions',          value: 'action' },
  ];
  const initialState = {
    bestOf: 0,
    description: "",
    numTeams: 0,
    winnerTeamId: 0,
    rivals: [] as number[],
    nextRoundId: 0,
    tournamentId: 0,
    hasWinner: false
  };
  const state = reactive({
    ...initialState,
  });
  const rules = {
    bestOf:       { required, numeric },
    description:  { required },
    numTeams:     { required, numeric, mustBeGreaterThan0 },
    winnerTeamId: { required, numeric, mustBeGreaterThan0 },
    rivals:       { required },
    nextRoundId:  { required, numeric },
    tournamentId: { required, numeric, mustBeGreaterThan0 },
    hasWinner:    { required },
  };
  
  const v$ = useVuelidate(rules, state);
  let roundId = 0;
  
  onMounted(async () => {
    await roundsStore.getAll;
    await teamsStore.getAll;
    await tournamentsStore.getAll;
  });
  
  async function submit() {
    const result = await v$.value.$validate();
    const request: RoundRequestDto = {
      bestOf: 0,
      description: "",
      numTeams: 0,
      winnerTeamId: 0,
      rivals: [],
      nextRoundId: 0,
      tournamentId: 0,
      hasWinner: false
    };
    if (result) {
      request.bestOf       = state.bestOf;
      request.description  = state.description;
      request.hasWinner    = state.hasWinner;
      request.nextRoundId  = state.nextRoundId;
      request.numTeams     = state.numTeams;
      request.rivals       = toRaw(state.rivals);
      request.tournamentId = state.tournamentId;
      request.winnerTeamId = state.winnerTeamId;

      if (roundId !== 0) {
        await roundsStore.updateRound(roundId, request);
        roundId = 0;
      }
      else
        await roundsStore.addRound(request);
      
      await roundsStore.getAll;
      clear();
    }
    else alert("Validation form failed!");
  }

  async function editRound(round: Round) {
    state.bestOf       = round.bestOf;
    state.description  = round.description;
    state.hasWinner    = round.hasWinner;
    state.nextRoundId  = round.nextRoundId;
    state.numTeams     = round.numTeams;
    state.rivals       = round.rivals;
    state.tournamentId = round.tournamentId;
    state.winnerTeamId = round.winnerTeamId;
    roundId            = round.id;
  }

  async function deleteRound(id: number) {
    await roundsStore.removeRound(id);
  }
  
  function clear() {
    v$.value.$reset();
    state.bestOf       = 0;
    state.description  = "";
    state.hasWinner    = false;
    state.nextRoundId  = 0;
    state.numTeams     = 0;
    state.rivals       = [];
    state.tournamentId = 0;
    state.winnerTeamId = 0;
  }
</script>
