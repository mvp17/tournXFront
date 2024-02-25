<template>
  <h1>Match results</h1>
  <v-row>
    <v-col>
      <form>
        <v-select
          v-model="state.matchId"
          :items="matches"
          :error-messages="(v$.selectMatch.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Match"
          required
          @change="v$.matchId.$touch"
          @blur="v$.matchId.$touch"
        ></v-select>

        <v-select
          v-model="state.winnerTeamId"
          :items="teams"
          :error-messages="(v$.selectWinnerTeam.$errors as VuelidateError[]).map((e) => e.$message)"
          label="Winner Team"
          required
          @change="v$.winnerTeamId.$touch"
          @blur="v$.winnerTeamId.$touch"
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
          <tr v-for="matchResult in matchResults" :key="matchResult.match">
            <td>{{ matchResult.match }}</td>
            <td>{{ matchResult.winnerTeam }}</td>
            <td>{{ matchResult.result }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
  </v-row>
</template>


<script setup lang="ts">
  import { reactive } from 'vue';
  import { useVuelidate } from '@vuelidate/core';
  import { required, numeric } from '@vuelidate/validators';
  import { useMatchResultsStore } from '../stores/matchResultStore';
  import { onMounted } from 'vue';
  import { computed } from '@vue/reactivity';
  import { VuelidateError } from '../../../core/interfaces/VuelidateError';
  import { MatchResultRequestDto } from '../models/matchResultRequestDto';

  const matchResultsStore = useMatchResultsStore();
  const matchResults = computed(() => matchResultsStore.matchResults);

  const initialState = {
    result: '',
    matchId: 0,
    winnerTeamId: 0,
  };

  const state = reactive({
    ...initialState,
  });

  const matches = [1, 2, 3, 4];
  const teams = [1, 2]


  const rules = {
    result: { required },
    matchId: { required, numeric },
    winnerTeamId: { required, numeric },
  };

  const v$ = useVuelidate(rules, state);

  onMounted(() => {
    getMatchResults();
  });

  async function submit() {
    const result = await v$.value.$validate();
    const request: MatchResultRequestDto = {
      matchId: 0,
      winnerTeamId: 0,
      result: ""
    };

    if (result) {
      request.matchId = Number(state.matchId);
      request.winnerTeamId = Number(state.winnerTeamId);
      request.result = state.result;
      matchResultsStore.addMatchResult(request);
    }
    else alert("Validation form failed!");
  }

  function getMatchResults() {
    matchResultsStore.getAll;
  }

  function clear() {
    v$.value.$reset();
    state.matchId = 0;
    state.winnerTeamId = 0;
    state.result = "";
  }
</script>
