<template>
  <h1>Tournaments</h1>
  <v-row>
    <v-col>
      <form>
        <v-text-field
          v-model="state.name"
          :error-messages="(v$.name.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Name"
          required
          @input="v$.name.$touch"
          @blur="v$.name.$touch"
        ></v-text-field>

        <v-select
            v-model="state.level"
            :items="levels"
            :error-messages="(v$.level.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Level"
            item-title="level"
            item-value="value"
            required
            @change="v$.level.$touch"
            @blur="v$.level.$touch"
        ></v-select>

        <v-text-field
          v-model="state.game"
          :error-messages="(v$.game.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Game"
          required
          @input="v$.game.$touch"
          @blur="v$.game.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.type"
          :error-messages="(v$.type.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Type"
          required
          @input="v$.type.$touch"
          @blur="v$.type.$touch"
        ></v-text-field>

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
          v-model.number="state.minParticipants"
          :error-messages="(v$.minParticipants.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Minimum of participants"
          required
          type="number"
          @input="v$.minParticipants.$touch"
          @blur="v$.minParticipants.$touch"
        ></v-text-field>

        <v-text-field
          v-model.number="state.maxParticipants"
          :error-messages="(v$.maxParticipants.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Maximum of participants"
          required
          type="number"
          @input="v$.maxParticipants.$touch"
          @blur="v$.maxParticipants.$touch"
        ></v-text-field>

        <v-text-field
          v-model.number="state.minTeamPlayers"
          :error-messages="(v$.minTeamPlayers.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Minimum of team players"
          required
          type="number"
          @input="v$.minTeamPlayers.$touch"
          @blur="v$.minTeamPlayers.$touch"
        ></v-text-field>

        <v-text-field
          v-model.number="state.maxTeamPlayers"
          :error-messages="(v$.maxTeamPlayers.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Maximum of team players"
          required
          type="number"
          @input="v$.maxTeamPlayers.$touch"
          @blur="v$.maxTeamPlayers.$touch"
        ></v-text-field>

        <v-select
            v-model="state.participants"
            :items="teams"
            :error-messages="(v$.participants.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Participants"
            multiple
            required
            item-title="name"
            item-value="id"
            @change="v$.participants.$touch"
            @blur="v$.participants.$touch"
            variant="outlined"
        ></v-select>

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

        <v-select
            v-model="state.state"
            :items="states"
            :error-messages="(v$.state.$errors as VuelidateError[]).map((e) => e.$message)"
            label="State"
            item-title="state"
            item-value="value"
            required
            @change="v$.state.$touch"
            @blur="v$.state.$touch"
        ></v-select>

        <v-btn color="success" class="me-4" @click="submit"> submit </v-btn>
        <v-btn color="error" @click="clear"> clear </v-btn>
      </form>
    </v-col>
    <v-col>
      <v-data-table
        :items="tournaments"
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
          <v-btn @click="editTournament(item)" color="warning"> edit </v-btn>
          <v-btn @click="deleteTournament(item.id)" color="error"> delete </v-btn>
        </template>
      </v-data-table>
    </v-col>
  </v-row>
</template>


<script setup lang="ts">
  import { reactive, toRaw } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required, numeric, minLength } from '@vuelidate/validators';
  import { onMounted } from 'vue';
  import { computed } from '@vue/reactivity';
  import { useTournamentsStore } from '../stores/tournamentStore';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';
  import { TournamentRequestDto } from '../models/tournamentRequestDto';
  import { useTeamsStore } from '../../teams/stores/teamStore';
  import { mustBeGreaterThan0 } from '../../../core/utils/functions';
  import { Tournament } from '../models/tournament';

  const tournamentsStore = useTournamentsStore();
  const tournaments = computed(() => tournamentsStore.tournaments);
  const teamsStore = useTeamsStore();
  const teams = computed(() => toRaw(teamsStore.teams));
  const levels = [
    { level: "Begginer", value: 0 },
    { level: "Amateur", value: 1 },
    { level: "Professional", value: 2 }
  ];
  const states = [
    { state: "Uninitialized", value: 0 },
    { state: "Initializing",  value: 1 },
    { state: "Initialized",   value: 2 },
    { state: "In progress",   value: 3 },
    { state: "Finished",      value: 4 },
    { state: "Closed",        value: 5 },
    { state: "To archive",    value: 6 }
  ];
  const headers = [
    { text: 'Id',               value: 'id' },
    { text: 'Name',             value: 'name' },
    { text: 'Level',            value: 'level' },
    { text: 'Game',             value: 'game' },
    { text: 'Type',             value: 'type' },
    { text: 'Description',      value: 'description' },
    { text: 'Min Participants', value: 'minParticipants' },
    { text: 'Max Participants', value: 'maxParticipants' },
    { text: 'Min Team Players', value: 'minTeamPlayers' },
    { text: 'Max Team Players', value: 'maxTeamPlayers' },
    { text: 'Max Team Players', value: 'maxTeamPlayers' },
    { text: 'Participants',     value: 'participants' },
    { text: 'Winner Team Id',   value: 'winnerTeamId'},
    { text: 'Best Of',          value: 'bestOf' },
    { text: 'State',            value: 'state' },
    { text: 'Actions',          value: 'action'},
  ];
  const initialState = {
    name: "",
    level: 0,
    game: "",
    type: "",
    description: "",
    minParticipants: 0,
    maxParticipants: 0,
    minTeamPlayers: 0,
    maxTeamPlayers: 0,
    participants: [] as number[],
    winnerTeamId: 0,
    bestOf: 0,
    state: 0
  };
  const state = reactive({
    ...initialState,
  });
  const rules = {
    name:            { required, minLength: minLength(5) },
    level:           { required, numeric },
    game:            { required },
    type:            { required },
    description:     { required },
    minParticipants: { required, numeric, mustBeGreaterThan0 },
    maxParticipants: { required, numeric, mustBeGreaterThan0 },
    minTeamPlayers:  { required, numeric, mustBeGreaterThan0 },
    maxTeamPlayers:  { required, numeric, mustBeGreaterThan0 },
    participants:    { required },
    winnerTeamId:    { required, numeric, mustBeGreaterThan0 },
    bestOf:          { required, numeric },
    state:           { required, numeric }
  };

  const v$ = useVuelidate(rules, state);
  let tournamentId = 0;

  onMounted(async () => {
    await tournamentsStore.getAll;
    await teamsStore.getAll;
  });

  async function submit() {
    const result = await v$.value.$validate();
    const request: TournamentRequestDto = {
      name: "",
      level: 0,
      game: "",
      type: "",
      description: "",
      minParticipants: 0,
      maxParticipants: 0,
      minTeamPlayers: 0,
      maxTeamPlayers: 0,
      participants: [],
      winnerTeamId: 0,
      bestOf: 0,
      state: 0
    };
    if (result) {
      request.name            = state.name;
      request.level           = state.level;
      request.game            = state.game;
      request.type            = state.type;
      request.description     = state.description;
      request.minParticipants = state.minParticipants;
      request.maxParticipants = state.maxParticipants;
      request.minTeamPlayers  = state.minTeamPlayers;
      request.maxTeamPlayers  = state.maxTeamPlayers;
      request.participants    = toRaw(state.participants);
      request.winnerTeamId    = state.winnerTeamId;
      request.bestOf          = state.bestOf;
      request.state           = state.state;

      if (tournamentId !== 0) {
        await tournamentsStore.updateTournament(tournamentId, request);
        tournamentId = 0; 
      }
      else
        await tournamentsStore.addTournament(request);
      await tournamentsStore.getAll;
      clear();
    }
    else alert("Validation form failed!");
  }

  async function editTournament(tournament: Tournament) {
    state.name            = tournament.name;
    state.level           = tournament.level;
    state.game            = tournament.game;
    state.type            = tournament.type;
    state.description     = tournament.description;
    state.minParticipants = tournament.minParticipants;
    state.maxParticipants = tournament.maxParticipants;
    state.minTeamPlayers  = tournament.minTeamPlayers;
    state.maxTeamPlayers  = tournament.maxTeamPlayers;
    state.participants    = tournament.participants;
    state.winnerTeamId    = tournament.winnerTeamId;
    state.bestOf          = tournament.bestOf;
    state.state           = tournament.state;
    tournamentId          = tournament.id;
  }

  async function deleteTournament(id: number) {
    await tournamentsStore.removeTournament(id);
  }

  function clear() {
    v$.value.$reset();
    state.name            = "";
    state.level           = 0;
    state.game            = "";
    state.type            = "";
    state.description     = "";
    state.minParticipants = 0;
    state.maxParticipants = 0;
    state.minTeamPlayers  = 0;
    state.maxTeamPlayers  = 0;
    state.participants    = [];
    state.winnerTeamId    = 0;
    state.bestOf          = 0;
    state.state           = 0;
  }
</script>
