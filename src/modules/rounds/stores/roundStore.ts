import http from '../../../http-common';
import { defineStore } from 'pinia';
import { Round } from '../models/round';

export const useRoundsStore = defineStore('rounds', {
  state: () => ({
    rounds: [] as Round[],
  }),
  getters: {
    getAll: async (state) => {
      const apiResponse = await http.get('/rounds');
      state.rounds = apiResponse.data;
    },
    getById: (state) => {
      return (id: number) => state.rounds.find((round) => round.id === id);
    },
  },
  actions: {
    async addRound(newRound: Round) {
      const apiResponse = await http.post('/rounds', newRound);
      this.rounds = [...this.rounds, apiResponse.data];
    },
    async updateRound(id: number, currentRound: Round) {
      const apiResponse = await http.put(`/rounds/${id}`, currentRound);
      let roundsState = this.rounds.filter((round) => round.id !== id);
      roundsState.push(apiResponse.data);
      this.rounds = roundsState;
    },
    async removeRound(id: number) {
      await http.delete(`/rounds/${id}`);
      this.rounds = this.rounds.filter((round) => round.id !== id);
    },
  },
});
