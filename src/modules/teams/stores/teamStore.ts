import http, { authorizeRequest } from '../../../http-common';
import { defineStore } from 'pinia';
import { Team } from '../models/team';
import { TeamRequestDto } from '../models/teamRequestDto';

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    teams: [] as Team[],
  }),
  getters: {
    getAll: async (state) => {
      authorizeRequest();
      const apiResponse = await http.get('/team');
      state.teams = apiResponse.data;
    },
    getById: (state) => {
      return (id: number) => state.teams.find((team) => team.id === id);
    },
  },
  actions: {
    async addTeam(newTeam: TeamRequestDto) {
      authorizeRequest();
      const apiResponse = await http.post('/team', newTeam);
      this.teams = [...this.teams, apiResponse.data];
    },
    async updateTeam(id: number, currentTeam: Team) {
      authorizeRequest();
      const apiResponse = await http.put(`/team/${id}`, currentTeam);
      let teamsState = this.teams.filter((team) => team.id !== id);
      teamsState.push(apiResponse.data);
      this.teams = teamsState;
    },
    async removeTeam(id: number) {
      authorizeRequest();
      await http.delete(`/team/${id}`);
      this.teams = this.teams.filter((team) => team.id !== id);
    },
  },
});
