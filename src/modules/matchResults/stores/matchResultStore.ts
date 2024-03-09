import http from '../../../http-common';
import { defineStore } from 'pinia';
import { MatchResult } from '../models/matchResult';
import { MatchResultRequestDto } from '../models/matchResultRequestDto';
import { useUserStore } from '../../users/stores/userStore';

export const useMatchResultsStore = defineStore('matchResults', {
  state: () => ({
    matchResults: [] as MatchResult[],
  }),
  getters: {
    getAll: async (state) => {
      http.interceptors.request.use(async (request) => {
        const token = useUserStore.getUser.token;
        if (token !== "") request.headers.Authorization = `Bearer ${token}`;
        return request;
      });
      const apiResponse = await http.get('/matchResult');
      state.matchResults = apiResponse.data;
    },
    getById: (state) => {
      return (id: number) =>
        state.matchResults.find((matchResult) => matchResult.id === id);
    },
  },
  actions: {
    async addMatchResult(newMatchResult: MatchResultRequestDto) {
      const apiResponse = await http.post('/matchResult', newMatchResult);
      this.matchResults = [...this.matchResults, apiResponse.data];
    },
    async updateMatchResult(id: number, currentMatchResult: MatchResultRequestDto) {
      const apiResponse = await http.put(`/matchResult/${id}`, currentMatchResult);
      let matchResultState = this.matchResults.filter(
        (matchResult) => matchResult.id !== id
      );
      matchResultState.push(apiResponse.data);
      this.matchResults = matchResultState;
    },
    async removeMatchResult(id: number) {
      await http.delete(`/matchResult/${id}`);
      this.matchResults = this.matchResults.filter(
        (matchResult) => matchResult.id !== id
      );
    },
  },
});
