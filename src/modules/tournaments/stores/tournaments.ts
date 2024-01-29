import http from '../../../http-common';
import { defineStore } from 'pinia';
import { Tournament } from '../models/tournament';

export const useTournamentsStore = defineStore('tournaments', {
  state: () => ({
    tournaments: [] as Tournament[],
  }),
  getters: {
    getAll: async (state) => {
      const apiResponse = await http.get('/tournaments');
      state.tournaments = apiResponse.data;
    },
    getById: (state) => {
      return (id: number) =>
        state.tournaments.find((tournament: Tournament) => tournament.id === id);
    },
  },
  actions: {
    async addTournament(newTournament: Tournament) {
      const apiResponse = await http.post('/tournaments', newTournament);
      this.tournaments = [...this.tournaments, apiResponse.data];
    },
    async updateTournament(id: number, currentTournament: Tournament) {
      const apiResponse = await http.put(
        `/tournaments/${id}`,
        currentTournament
      );
      let tournamentsState = this.tournaments.filter(
        (tournament) => tournament.id !== id
      );
      tournamentsState.push(apiResponse.data);
      this.tournaments = tournamentsState;
    },
    async removeTournament(id: number) {
      await http.delete(`/tournaments/${id}`);
      this.tournaments = this.tournaments.filter(
        (tournament) => tournament.id !== id
      );
    },
  },
});
