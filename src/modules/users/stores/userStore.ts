import http from '../../../http-common';
import { defineStore } from 'pinia';
import { User } from '../models/user';

export const useUserStore = defineStore('user', {
  state: () => ({
    user: {} as User,
  }),
  getters: {
    getAll: async (state) => {},
    getById: (state) => {},
  },
  actions: {
    async registerPlayer(newPlayer: User) {
      const apiResponse = await http.post('/player/register', newPlayer);
      this.user = apiResponse.data;
    },
    async loginPlayer(currentPlayer: User) {
      const apiResponse = await http.post("/player/login", currentPlayer);
      this.user = apiResponse.data;
    },
    async registerTournamentMaster(newTournamentMaster: User) {
        const apiResponse = await http.post('/tournamentMaster/register', newTournamentMaster);
        this.user = apiResponse.data;
      },
      async loginTournamentMaster(currentTournamentMaster: User) {
        const apiResponse = await http.post("/tournamentMaster/login", currentTournamentMaster);
        this.user = apiResponse.data;
      }
  },
});
