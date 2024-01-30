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
            v-model="state.winner"
            :items="teams"
            :error-messages="(v$.winner.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Winner Team"
            required
            @change="v$.winner.$touch"
            @blur="v$.winner.$touch"
            variant="outlined"
        ></v-select>

        <v-select
            v-model="state.round"
            :items="rounds"
            :error-messages="(v$.round.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Round"
            required
            @change="v$.round.$touch"
            @blur="v$.round.$touch"
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
          :headers="headers"
          :items="matchesList"
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
        matchesList: [
          {
            description: "sdfsdvcsdvcsd",
            winner: -1,
            round: 3,
            hasWinner: false
          },
          {
            description: "hrttyhrtvcwcwc",
            winner: 1,
            round: 2,
            hasWinner: true
          },
        ],
        headers: [
          {
            title: 'Description',
            align: 'end',
            key: 'description',
          },
          {
            title: 'Winner team',
            align: 'end',
            key: 'winner',
          },
          {
            title: 'Round',
            align: 'end',
            key: 'round',
          },
          {
            title: 'Has a winner?',
            align: 'end',
            key: 'hasWinner',
          }
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
  import { useMatchesStore } from '../stores/matches';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';
  
  const matchesStore = useMatchesStore();
  const matches = computed(() => matchesStore.matches);

  const teams = [1, 2, 3, 4];
  const rounds = [11, 12, 13, 14];

  const initialState = {
    description: '',
    winner: 0,
    round: 0,
    hasWinner: false
  };
  
  const state = reactive({
    ...initialState,
  });
  
  const mustBeGreaterThan0 = (value: number) => value > 0;
  const rules = {
    description: { required },
    winner: { required, numeric },
    round: { required, mustBeGreaterThan0 },
    hasWinner: { required },
  };
  
  const v$ = useVuelidate(rules, state);
  
  onMounted(() => {
    //getMatches();
  });
  
  async function submit() {
    const result = await v$.value.$validate();
    const request = {};
    if (result) {
      for (const key of Object.keys(initialState)) {
        request[key] = state[key];
      }
      console.log(request)
      //matchesStore.addMatch(request);
    }
    else alert("Validation form failed!");
  }
  
  function getMatches() {
    matchesStore.getAll();
  }
  
  function clear() {
    v$.value.$reset();
  
    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value;
    }
  }
  </script>
  