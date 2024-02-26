import { defineStore } from 'pinia';
import { Player } from '../models/player';
import http from '../../../http-common';

export const usePlayerStore = defineStore('players', {
  state: () => ({
    players: [] as Player[]
  }),
  getters: {
    getPlayers: async (state) => {
        const apiResponse = await http.get('/player');
        state.players = apiResponse.data;
        return state.players
    }
  }
});
