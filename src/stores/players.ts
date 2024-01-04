import http from '../http-common';
import { defineStore } from 'pinia';

export const usePlayersStore = defineStore('players', {
  state: () => ({
    /** @type {{ id: number, username: string, email: string, password: string }[]} */
    players: [],
  }),
  getters: {
    getAll: async (state) => {
      const apiResponse = await http.get('/players');
      state.players = apiResponse.data;
    },
    getById: (state) => {
      return (id) => state.players.find((player) => player.id === id);
    },
  },
  actions: {
    async addPlayer(newPlayer) {
      const apiResponse = await http.post('/players', newPlayer);
      this.players = [...this.players, apiResponse.data];
    },
    async updatePlayer(id, currentPlayer) {
      const apiResponse = await http.put(`/players/${id}`, currentPlayer);
      let playersState = this.players.filter((player) => player.id !== id);
      playersState.push(apiResponse.data);
      this.players = playersState;
    },
    async removePlayer(id) {
      await http.delete(`/players/${id}`);
      this.players = this.players.filter((player) => player.id !== id);
    },
  },
});
