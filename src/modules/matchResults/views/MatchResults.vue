<template>
  <h1>Match results</h1>
  <v-row>
    <v-col>
      <form>
        <v-select
          v-model="state.selectMatch"
          :items="matches"
          :error-messages="(v$.selectMatch.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Match"
          required
          @change="v$.selectMatch.$touch"
          @blur="v$.selectMatch.$touch"
        ></v-select>

        <v-select
          v-model="state.selectWinnerTeam"
          :items="teams"
          :error-messages="(v$.selectWinnerTeam.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Winner Team"
          required
          @change="v$.selectWinnerTeam.$touch"
          @blur="v$.selectWinnerTeam.$touch"
        ></v-select>

        <v-text-field
          v-model="state.result"
          :error-messages="(v$.result.$errors as VuelidateError[]).map((e) => e.$message)"
          :counter="10"
          label="Result"
          required
          @input="v$.result.$touch"
          @blur="v$.result.$touch"
        ></v-text-field>

        <v-btn color="success" class="me-4" @click="submit"> submit </v-btn>
        <v-btn color="error" @click="clear"> clear </v-btn>
      </form>
    </v-col>
    <v-col>
      <v-table fixed-header>
        <thead>
          <tr>
            <th class="text-left">Match</th>
            <th class="text-left">Winner team</th>
            <th class="text-left">Result</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="matchResult in matchResultsList" :key="matchResult.match">
            <td>{{ matchResult.match }}</td>
            <td>{{ matchResult.winnerTeam }}</td>
            <td>{{ matchResult.result }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>

<script lang="ts">
export default {
  data() {
    return {
      matchResultsList: [
        {
          match: '1',
          winnerTeam: 'abc',
          result: '0-0',
        },
        {
          match: '2',
          winnerTeam: 'def',
          result: '1-0',
        },
        {
          match: '3',
          winnerTeam: 'ghi',
          result: '0-3',
        },
        {
          match: '4',
          winnerTeam: 'jkl',
          result: '5-3',
        },
      ],
    };
  },
};
</script>

<script setup lang="ts">
import { reactive } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { required } from '@vuelidate/validators';
import { useMatchResultsStore } from '../stores/matchResults';
import { onMounted } from 'vue';
import { computed } from '@vue/reactivity';
import { VuelidateError } from '../../../core/interfaces/VuelidateError';

const matchResultsStore = useMatchResultsStore();
const matchResults = computed(() => matchResultsStore.matchResults);

const initialState = {
  message: '',
  result: '',
  selectMatch: null,
  selectWinnerTeam: null,
};

const state = reactive({
  ...initialState,
});

const matches = ['Match 1', 'Match 2', 'Match 3', 'Match 4'];
const teams = ['Team 1', 'Team 2', 'Team 3', 'Team 4'];

const rules = {
  result: { required },
  selectMatch: { required },
  selectWinnerTeam: { required },
};

const v$ = useVuelidate(rules, state);

onMounted(() => {
  //getMatchResults();
});

async function submit() {
  const result = await v$.value.$validate();
  const request = {};
  if (result) {
    for (const key of Object.keys(initialState)) {
      request[key] = state[key];
    }
    //matchResultsStore.addMatchResult(request);
  }
}

function getMatchResults() {
  matchResultsStore.getAll();
}

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}
</script>
