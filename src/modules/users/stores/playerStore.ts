import { defineStore } from 'pinia';
import { Player } from '../models/player';
import http from '../../../http-common';
import { useUserStore } from './userStore';

export const usePlayerStore = defineStore('players', {
  state: () => ({
    players: [] as Player[]
  }),
  getters: {
    getAll: async (state) => {
      http.interceptors.request.use(async (request) => {
        const token = useUserStore.getUser.token;
        if (token !== "") request.headers.Authorization = `Bearer ${token}`;
        return request;
      });
      const apiResponse = await http.get('/player');
      state.players = apiResponse.data;
      return state.players
    }
  }
});
