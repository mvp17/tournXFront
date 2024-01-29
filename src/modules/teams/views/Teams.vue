<template>
  <h1>Teams</h1>
  <v-row>
    <v-col>
      <form>
        <v-text-field
          v-model="state.name"
          :error-messages="v$.name.$errors.map((e) => e.$message)"
          :counter="10"
          label="Name"
          required
          @input="v$.name.$touch"
          @blur="v$.name.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.level"
          :error-messages="v$.level.$errors.map((e) => e.$message)"
          :counter="10"
          label="Level"
          required
          @input="v$.level.$touch"
          @blur="v$.level.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.game"
          :error-messages="v$.game.$errors.map((e) => e.$message)"
          :counter="10"
          label="Game"
          required
          @input="v$.game.$touch"
          @blur="v$.game.$touch"
        ></v-text-field>

        <v-text-field
          v-model="state.maxPlayers"
          :error-messages="v$.maxPlayers.$errors.map((e) => e.$message)"
          :counter="10"
          label="Maximum of players"
          required
          @input="v$.maxPlayers.$touch"
          @blur="v$.maxPlayers.$touch"
        ></v-text-field>

        <v-btn color="success" class="me-4" @click="submit"> submit </v-btn>
        <v-btn color="error" @click="clear"> clear </v-btn>
      </form>
    </v-col>
    <v-col>
      <v-data-table
        :headers="headers"
        :items="teamsList"
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
      teamsList: [
        {
          name: 'FCB',
          level: 'Pro',
          game: 'football',
          maxPlayers: 11,
        },
        {
          name: 'RMA',
          level: 'Pro',
          game: 'football',
          maxPlayers: 11,
        },
        {
          name: 'PSG',
          level: 'Pro',
          game: 'football',
          maxPlayers: 11,
        },
        {
          name: 'FCB',
          level: 'Pro',
          game: 'basketball',
          maxPlayers: 5,
        },
        {
          name: 'RMA',
          level: 'Pro',
          game: 'basketball',
          maxPlayers: 5,
        },
      ],
      headers: [
        {
          title: 'Name',
          align: 'end',
          key: 'name',
        },
        {
          title: 'Level',
          align: 'end',
          key: 'level',
        },
        {
          title: 'Game',
          align: 'end',
          key: 'game',
        },
        {
          title: 'Maximum of Players',
          align: 'end',
          key: 'maxPlayers',
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
import { useTeamsStore } from '../stores/teams';

const teamsStore = useTeamsStore();
const teams = computed(() => teamsStore.teams);

const initialState = {
  name: '',
  level: '',
  game: '',
  maxPlayers: '',
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  level: { required },
  game: { required },
  maxPlayers: { required, numeric },
};

const v$ = useVuelidate(rules, state);

onMounted(() => {
  //getTeams();
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

function getTeams() {
  teamsStore.getAll();
}

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}
</script>
../features/teams/stores/teams