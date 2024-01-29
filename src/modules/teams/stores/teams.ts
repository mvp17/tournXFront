import http from '../../../http-common';
import { defineStore } from 'pinia';
import { Team } from '../models/team';

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    teams: [] as Team[],
  }),
  getters: {
    getAll: async (state) => {
      const apiResponse = await http.get('/teams');
      state.teams = apiResponse.data;
    },
    getById: (state) => {
      return (id: number) => state.teams.find((team) => team.id === id);
    },
  },
  actions: {
    async addTeam(newTeam: Team) {
      const apiResponse = await http.post('/teams', newTeam);
      this.teams = [...this.teams, apiResponse.data];
    },
    async updateTeam(id: number, currentTeam: Team) {
      const apiResponse = await http.put(`/teams/${id}`, currentTeam);
      let teamsState = this.teams.filter((team) => team.id !== id);
      teamsState.push(apiResponse.data);
      this.teams = teamsState;
    },
    async removeTeam(id: number) {
      await http.delete(`/teams/${id}`);
      this.teams = this.teams.filter((team) => team.id !== id);
    },
  },
});
