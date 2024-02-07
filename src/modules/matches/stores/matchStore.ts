import http from '../../../http-common';
import { defineStore } from 'pinia';
import { Match } from '../models/match';

export const useMatchesStore = defineStore('matches', {
  state: () => ({
    matches: [] as Match[],
  }),
  getters: {
    getAll: async (state) => {
      const apiResponse = await http.get('/matches');
      state.matches = apiResponse.data;
    },
    getById: (state) => {
      return (id: number) => state.matches.find((match) => match.id === id);
    },
  },
  actions: {
    async addMatch(newMatch: Match) {
      const apiResponse = await http.post('/matches', newMatch);
      this.matches = [...this.matches, apiResponse.data];
    },
    async updateMatch(id: number, currentMatch: Match) {
      const apiResponse = await http.put(`/matches/${id}`, currentMatch);
      let matchesState = this.matches.filter((match) => match.id !== id);
      matchesState.push(apiResponse.data);
      this.matches = matchesState;
    },
    async removeMatch(id: number) {
      await http.delete(`/matches/${id}`);
      this.matches = this.matches.filter((match) => match.id !== id);
    },
  },
});
