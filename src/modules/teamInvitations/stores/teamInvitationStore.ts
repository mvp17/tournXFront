import http from '../../../http-common';
import { defineStore } from 'pinia';
import { TeamInvitation } from '../models/teamInvitation';
import { TeamInvitationRequestDto } from '../models/teamInvitationRequestDto';

export const useTeamInvitationsStore = defineStore('teamInvitations', {
  state: () => ({
    teamInvitations: [] as TeamInvitation[],
  }),
  getters: {
    getAll: async (state) => {
      const apiResponse = await http.get('/team-invitations');
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
      const apiResponse = await http.post(
        '/team-invitations',
        newTeamInvitation
      );
      this.teamInvitations = [...this.teamInvitations, apiResponse.data];
    },
    async updateTeamInvitation(id: number, currentTeamInvitation: TeamInvitationRequestDto) {
      const apiResponse = await http.put(
        `/team-invitations/${id}`,
        currentTeamInvitation
      );
      let teamInvitationsState = this.teamInvitations.filter(
        (teamInvitation) => teamInvitation.id !== id
      );
      teamInvitationsState.push(apiResponse.data);
      this.teamInvitations = teamInvitationsState;
    },
    async removeTeamInvitation(id: number) {
      await http.delete(`/team-invitations/${id}`);
      this.teamInvitations = this.teamInvitations.filter(
        (teamInvitation) => teamInvitation.id !== id
      );
    },
  },
});
