import http from '../../../http-common';
import { defineStore } from 'pinia';

export const useTournamentsStore = defineStore('tournaments', {
  state: () => ({
    /** @type {{ id: number,
     *           name: string,
     *           level: string,
     *           game: string,
     *           type: string,
     *           description: string,
     *           minParticipants: number,
     *           maxParticipants: number,
     *           minTeamPlayers: number,
     *           maxTeamPlayers: number }[]} */
    tournaments: [],
  }),
  getters: {
    getAll: async (state) => {
      const apiResponse = await http.get('/tournaments');
      state.tournaments = apiResponse.data;
    },
    getById: (state) => {
      return (id) =>
        state.tournaments.find((tournament) => tournament.id === id);
    },
  },
  actions: {
    async addTournament(newTournament) {
      const apiResponse = await http.post('/tournaments', newTournament);
      this.tournaments = [...this.tournaments, apiResponse.data];
    },
    async updateTournament(id, currentTournament) {
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
    async removeTournament(id) {
      await http.delete(`/tournaments/${id}`);
      this.tournaments = this.tournaments.filter(
        (tournament) => tournament.id !== id
      );
    },
  },
});
