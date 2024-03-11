import http from '../../../http-common';
import { defineStore } from 'pinia';
import { Match } from '../models/match';
import { MatchRequestDto } from '../models/matchRequestDto';
import { useUserStore } from '../../users/stores/userStore';

export const useMatchesStore = defineStore('matches', {
  state: () => ({
    matches: [] as Match[],
  }),
  getters: {
    getAll: async (state) => {
      http.interceptors.request.use(async (request) => {
        const token = useUserStore.getUser.token;
        if (token !== "") request.headers.Authorization = `Bearer ${token}`;
        return request;
      });
      const apiResponse = await http.get('/match');
      state.matches = apiResponse.data;
    },
    getById: (state) => {
      return (id: number) => state.matches.find((match) => match.id === id);
    },
  },
  actions: {
    async addMatch(newMatch: MatchRequestDto) {
      const apiResponse = await http.post('/match', newMatch);
      this.matches = [...this.matches, apiResponse.data];
    },
    async updateMatch(id: number, currentMatch: MatchRequestDto) {
      const apiResponse = await http.put(`/match/${id}`, currentMatch);
      let matchesState = this.matches.filter((match) => match.id !== id);
      matchesState.push(apiResponse.data);
      this.matches = matchesState;
    },
    async removeMatch(id: number) {
      await http.delete(`/match/${id}`);
      this.matches = this.matches.filter((match) => match.id !== id);
    },
  },
});
