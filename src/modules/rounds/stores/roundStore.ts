import http from '../../../http-common';
import { defineStore } from 'pinia';
import { Round } from '../models/round';
import { RoundRequestDto } from '../models/roundRequestDto';
import { useUserStore } from '../../users/stores/userStore';

export const useRoundsStore = defineStore('rounds', {
  state: () => ({
    rounds: [] as Round[],
  }),
  getters: {
    getAll: async (state) => {
      http.interceptors.request.use(async (request) => {
        const token = useUserStore.getUser.token;
        if (token !== "") request.headers.Authorization = `Bearer ${token}`;
        return request;
      });
      const apiResponse = await http.get('/round');
      state.rounds = apiResponse.data;
    },
    getById: (state) => {
      return (id: number) => state.rounds.find((round) => round.id === id);
    },
  },
  actions: {
    async addRound(newRound: RoundRequestDto) {
      const apiResponse = await http.post('/round', newRound);
      this.rounds = [...this.rounds, apiResponse.data];
    },
    async updateRound(id: number, currentRound: RoundRequestDto) {
      const apiResponse = await http.put(`/round/${id}`, currentRound);
      let roundsState = this.rounds.filter((round) => round.id !== id);
      roundsState.push(apiResponse.data);
      this.rounds = roundsState;
    },
    async removeRound(id: number) {
      await http.delete(`/round/${id}`);
      this.rounds = this.rounds.filter((round) => round.id !== id);
    },
  },
});
