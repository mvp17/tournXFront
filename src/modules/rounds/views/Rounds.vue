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
            v-model="state.nextRound"
            :items="nextRounds"
            :error-messages="(v$.nextRound.$errors as VuelidateError[]).map((e) => e.$message)"
            label="Next Round"
            required
            @change="v$.nextRound.$touch"
            @blur="v$.nextRound.$touch"
            variant="outlined"
        ></v-select>

        <v-select
            v-model="state.tournament"
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
          :headers="headers"
          :items="roundsList"
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
        roundsList: [
          {
            bestOf: 1,
            numTeams: 2,
            winner: -1,
            rivals: [],
            nextRound: 3,
            tournament: 4,
            hasWinner: false
          },
          {
            bestOf: 2,
            numTeams: 4,
            winner: 1,
            rivals: [],
            nextRound: 2,
            tournament: 5,
            hasWinner: true
          },
        ],
        headers: [
          {
            title: 'Best of',
            align: 'end',
            key: 'bestOf',
          },
          {
            title: 'Number of teams',
            align: 'end',
            key: 'numTeams',
          },
          {
            title: 'Winner Team',
            align: 'end',
            key: 'winner',
          },
          {
            title: 'Rivals',
            align: 'end',
            key: 'rivals',
          },
          {
            title: 'Next round',
            align: 'end',
            key: 'nextRound',
          },
          {
            title: 'Tournament',
            align: 'end',
            key: 'tournament',
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
  import { useRoundsStore } from '../stores/rounds';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';
  
  const roundsStore = useRoundsStore();
  const rounds = computed(() => roundsStore.rounds);

  const teams = [1, 2, 3, 4];
  const rivals = [5, 22, 13, 74];
  const nextRounds = [11, 12, 13, 14];
  const tournaments = [100, 200, 300, 400];
  
  const initialState = {
    bestOf: 0,
    numTeams: 0,
    winner: 0,
    rivals: [],
    nextRound: 0,
    tournament: 0,
    hasWinner: false
  };
  
  const state = reactive({
    ...initialState,
  });
  
  const rules = {
    bestOf: { required, numeric },
    numTeams: { required, numeric },
    winner: { required, numeric },
    rivals: { required },
    nextRound: { required, numeric },
    tournament: { required, numeric },
    hasWinner: { required },
  };
  
  const v$ = useVuelidate(rules, state);
  
  onMounted(() => {
    //getRounds();
  });
  
  async function submit() {
    const result = await v$.value.$validate();
    const request = {};
    if (result) {
      for (const key of Object.keys(initialState)) {
        request[key] = state[key];
      }
      //roundsStore.addRound(request);
    }
    else alert("Validation form failed!");
  }
  
  function getRounds() {
    roundsStore.getAll();
  }
  
  function clear() {
    v$.value.$reset();
  
    for (const [key, value] of Object.entries(initialState)) {
      state[key] = value;
    }
  }
  </script>
  