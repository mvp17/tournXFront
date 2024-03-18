import http from '../../../http-common';
import { defineStore } from 'pinia';
import { Team } from '../models/team';
import { TeamRequestDto } from '../models/teamRequestDto';
import { useUserStore } from '../../users/stores/userStore';

export const useTeamsStore = defineStore('teams', {
  state: () => ({
    teams: [] as Team[],
  }),
  getters: {
    getAll: async (state) => {
      http.interceptors.request.use(async (request) => {
        const token = useUserStore.getUser.token;
        if (token !== "") request.headers.Authorization = `Bearer ${token}`;
        return request;
      });
      const apiResponse = await http.get('/team');
      state.teams = apiResponse.data;
    },
    getById: (state) => {
      return (id: number) => state.teams.find((team) => team.id === id);
    },
  },
  actions: {
    async addTeam(newTeam: TeamRequestDto) {
      const apiResponse = await http.post('/team', newTeam);
      this.teams = [...this.teams, apiResponse.data];
    },
    async updateTeam(id: number, currentTeam: TeamRequestDto) {
      const apiResponse = await http.put(`/team/${id}`, currentTeam);
      let teamsState = this.teams.filter((team) => team.id !== id);
      teamsState.push(apiResponse.data);
      this.teams = teamsState;
    },
    async removeTeam(id: number) {
      await http.delete(`/team/${id}`);
      this.teams = this.teams.filter((team) => team.id !== id);
    },
  },
});
