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

        <v-text-field
          v-model="state.level"
          :error-messages="(v$.level.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Level"
          required
          @input="v$.level.$touch"
          @blur="v$.level.$touch"
        ></v-text-field>

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
          v-model="state.minParticipants"
          :error-messages="(v$.minParticipants.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Minimum of participants"
          required
          @input="v$.minParticipants.$touch"
          @blur="v$.minParticipants.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.maxParticipants"
          :error-messages="(v$.maxParticipants.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Maximum of participants"
          required
          @input="v$.maxParticipants.$touch"
          @blur="v$.maxParticipants.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.minTeamPlayers"
          :error-messages="(v$.minTeamPlayers.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Minimum of team players"
          required
          @input="v$.minTeamPlayers.$touch"
          @blur="v$.minTeamPlayers.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.maxTeamPlayers"
          :error-messages="(v$.maxTeamPlayers.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Maximum of team players"
          required
          @input="v$.maxTeamPlayers.$touch"
          @blur="v$.maxTeamPlayers.$touch"
        ></v-text-field>

        <v-btn color="success" class="me-4" @click="submit"> submit </v-btn>
        <v-btn color="error" @click="clear"> clear </v-btn>
      </form>
    </v-col>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="tournamentsList"
        class="elevation-1"
        item-key="name"
        items-per-page="5"
      ></v-data-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  data() {
    return {
      tournamentsList: [
        {
          name: 'Liga santander',
          level: 'First',
          game: 'football',
          type: '',
          description: '',
          minParticipants: '18',
          maxParticipants: '36',
          minTeamPlayers: '11',
          maxTeamPlayers: '25',
        },
        {
          name: 'Liga smartbank',
          level: 'Second',
          game: 'football',
          type: '',
          description: '',
          minParticipants: '18',
          maxParticipants: '32',
          minTeamPlayers: '11',
          maxTeamPlayers: '22',
        },
        {
          name: 'ACB',
          level: 'Pro',
          game: 'basketball',
          type: '',
          description: '',
          minParticipants: '7',
          maxParticipants: '12',
          minTeamPlayers: '8',
          maxTeamPlayers: '12',
        },
      ],
      headers: [
        {
          title: 'Name',
          align: 'end',
          key: 'name',
        },
        {
          title: 'Game',
          align: 'end',
          key: 'game',
        },
        {
          title: 'Minimum of Participants',
          align: 'end',
          key: 'minParticipants',
        },
        {
          title: 'Maximum of Participants',
          align: 'end',
          key: 'maxParticipants',
        },
        {
          title: 'Minimum of Team players',
          align: 'end',
          key: 'minTeamPlayers',
        },
        {
          title: 'Maximum of Team players',
          align: 'end',
          key: 'maxTeamPlayers',
        },
      ],
    };
  },
};
</script>

<script setup lang="ts">
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required, numeric } from '@vuelidate/validators';
import { onMounted } from 'vue';
import { computed } from '@vue/reactivity';
import { useTournamentsStore } from '../stores/tournaments';
import { VuelidateError } from '../../../core/interfaces/VuelidateError';

const tournamentsStore = useTournamentsStore();
const tournaments = computed(() => tournamentsStore.tournaments);

const initialState = {
  name: '',
  level: '',
  game: '',
  type: '',
  description: '',
  minParticipants: '',
  maxParticipants: '',
  minTeamPlayers: '',
  maxTeamPlayers: '',
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  level: { required },
  game: { required },
  type: { required },
  description: { required },
  minParticipants: { required, numeric },
  maxParticipants: { required, numeric },
  minTeamPlayers: { required, numeric },
  maxTeamPlayers: { required, numeric },
};

const v$ = useVuelidate(rules, state);

onMounted(() => {
  //getTournaments();
});

async function submit() {
  const result = await v$.value.$validate();
  const request = {};
  if (result) {
    for (const key of Object.keys(initialState)) {
      request[key] = state[key];
    }
    //teamsStore.addTeam(request);
  }
}

function getTournaments() {
  tournamentsStore.getAll();
}

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}
</script>
