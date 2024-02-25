<template>
  <h1>Teams</h1>
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
          v-model="state.maxPlayers"
          :error-messages="(v$.maxPlayers.$errors as VuelidateError[]).map((e) => e.$message)"
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
        :items="teams"
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
import { useTeamsStore } from '../stores/teamStore';
import { VuelidateError } from '../../../core/interfaces/VuelidateError';
import { TeamRequestDto } from '../models/teamRequestDto';

const teamsStore = useTeamsStore();
const teams = computed(() => teamsStore.teams);

const initialState = {
  name: '',
  level: '',
  game: '',
  maxPlayers: 0,
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
  getTeams();
});

async function submit() {
  const result = await v$.value.$validate();
  const request: TeamRequestDto = {
    name: "",
    level: "",
    game: "",
    maxPlayers: 0
  };

  if (result) {
    request.name = state.name;
    request.level = state.level;
    request.game = state.game;
    request.maxPlayers = state.maxPlayers;
    teamsStore.addTeam(request);
  }
  else alert("Validation form failed!");
}

async function getTeams() {
  await teamsStore.getAll;
}

function clear() {
  v$.value.$reset();
  state.name = "";
  state.level = "";
  state.game = "";
  state.maxPlayers = 0;
}
</script>
