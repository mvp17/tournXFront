import http from '../../../http-common';
import { defineStore } from 'pinia';
import { TeamInvitation } from '../models/teamInvitation';
import { TeamInvitationRequestDto } from '../models/teamInvitationRequestDto';
import { useUserStore } from '../../users/stores/userStore';

export const useTeamInvitationsStore = defineStore('teamInvitations', {
  state: () => ({
    teamInvitations: [] as TeamInvitation[],
  }),
  getters: {
    getAll: async (state) => {
      http.interceptors.request.use(async (request) => {
        const token = useUserStore.getUser.token;
        if (token !== "") request.headers.Authorization = `Bearer ${token}`;
        return request;
      });
      const apiResponse = await http.get('/teamInvitation');
      state.teamInvitations = apiResponse.data;
    },
    getById: (state) => {
      return (id: number) =>
        state.teamInvitations.find(
          (teamInvitation) => teamInvitation.id === id
        );
    },
  },
  actions: {
    async addTeamInvitation(newTeamInvitation: TeamInvitationRequestDto) {
      const apiResponse = await http.post('/teamInvitation', newTeamInvitation);
      this.teamInvitations = [...this.teamInvitations, apiResponse.data];
    },
    async updateTeamInvitation(id: number, currentTeamInvitation: TeamInvitationRequestDto) {
      const apiResponse = await http.put(`/teamInvitation/${id}`, currentTeamInvitation);
      let teamInvitationsState = this.teamInvitations.filter(
        (teamInvitation) => teamInvitation.id !== id
      );
      teamInvitationsState.push(apiResponse.data);
      this.teamInvitations = teamInvitationsState;
    },
    async removeTeamInvitation(id: number) {
      await http.delete(`/teamInvitation/${id}`);
      this.teamInvitations = this.teamInvitations.filter(
        (teamInvitation) => teamInvitation.id !== id
      );
    },
  },
});
