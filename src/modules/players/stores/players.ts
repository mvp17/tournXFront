import http from '../../../http-common';
import { defineStore } from 'pinia';
import { Player } from '../models/player';

export const usePlayersStore = defineStore('players', {
  state: () => ({
    players: [] as Player[],
  }),
  getters: {
    getAll: async (state) => {
      const apiResponse = await http.get('/players');
      state.players = apiResponse.data;
    },
    getById: (state) => {
      return (id: number) => state.players.find((player) => player.id === id);
    },
  },
  actions: {
    async addPlayer(newPlayer: Player) {
      const apiResponse = await http.post('/players', newPlayer);
      this.players = [...this.players, apiResponse.data];
    },
    async updatePlayer(id: number, currentPlayer: Player) {
      const apiResponse = await http.put(`/players/${id}`, currentPlayer);
      let playersState = this.players.filter((player) => player.id !== id);
      playersState.push(apiResponse.data);
      this.players = playersState;
    },
    async removePlayer(id: number) {
      await http.delete(`/players/${id}`);
      this.players = this.players.filter((player) => player.id !== id);
    },
  },
});
