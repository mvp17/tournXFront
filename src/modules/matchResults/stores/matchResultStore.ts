import http from '../../../http-common';
import { defineStore } from 'pinia';
import { MatchResult } from '../models/matchResult';
import { MatchResultRequestDto } from '../models/matchResultRequestDto';

export const useMatchResultsStore = defineStore('matchResults', {
  state: () => ({
    matchResults: [] as MatchResult[],
  }),
  getters: {
    getAll: async (state) => {
      const apiResponse = await http.get('/match-results');
      state.matchResults = apiResponse.data;
    },
    getById: (state) => {
      return (id: number) =>
        state.matchResults.find((matchResult) => matchResult.id === id);
    },
  },
  actions: {
    async addMatchResult(newMatchResult: MatchResultRequestDto) {
      const apiResponse = await http.post('/match-results', newMatchResult);
      this.matchResults = [...this.matchResults, apiResponse.data];
    },
    async updateMatchResult(id: number, currentMatchResult: MatchResultRequestDto) {
      const apiResponse = await http.put(
        `/match-results/${id}`,
        currentMatchResult
      );
      let matchResultState = this.matchResults.filter(
        (matchResult) => matchResult.id !== id
      );
      matchResultState.push(apiResponse.data);
      this.matchResults = matchResultState;
    },
    async removeMatchResult(id: number) {
      await http.delete(`/match-results/${id}`);
      this.matchResults = this.matchResults.filter(
        (matchResult) => matchResult.id !== id
      );
    },
  },
});
