import http from '../http-common';
import { defineStore } from 'pinia';

export const useMatchResultsStore = defineStore('matchResults', {
  state: () => ({
    /** @type {{ id: number, match: string, winnerTeam: string, result: string }[]} */
    matchResults: [],
  }),
  getters: {
    getAll: async (state) => {
      const apiResponse = await http.get('/match-results');
      state.matchResults = apiResponse.data;
    },
    getById: (state) => {
      return (id) =>
        state.matchResults.find((matchResult) => matchResult.id === id);
    },
  },
  actions: {
    async addMatchResult(newMatchResult) {
      const apiResponse = await http.post('/match-results', newMatchResult);
      this.matchResults = [...this.matchResults, apiResponse.data];
    },
    async updateMatchResult(id, currentMatchResult) {
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
    async removeMatchResult(id) {
      await http.delete(`/match-results/${id}`);
      this.matchResults = this.matchResults.filter(
        (matchResult) => matchResult.id !== id
      );
    },
  },
});
