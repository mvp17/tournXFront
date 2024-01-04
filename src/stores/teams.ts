import http from '../http-common';
import { defineStore } from 'pinia';

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    /** @type {{ id: number, name: string, level: string, game: string, maxPlayers: number }[]} */
    teams: [],
  }),
  getters: {
    getAll: async (state) => {
      const apiResponse = await http.get('/teams');
      state.teams = apiResponse.data;
    },
    getById: (state) => {
      return (id) => state.teams.find((team) => team.id === id);
    },
  },
  actions: {
    async addTeam(newTeam) {
      const apiResponse = await http.post('/teams', newTeam);
      this.teams = [...this.teams, apiResponse.data];
    },
    async updateTeam(id, currentTeam) {
      const apiResponse = await http.put(`/teams/${id}`, currentTeam);
      let teamsState = this.teams.filter((team) => team.id !== id);
      teamsState.push(apiResponse.data);
      this.teams = teamsState;
    },
    async removeTeam(id) {
      await http.delete(`/teams/${id}`);
      this.teams = this.teams.filter((team) => team.id !== id);
    },
  },
});
