import http from '../../../http-common';
import { defineStore } from 'pinia';
import { TeamInvitation } from '../models/teamInvitation';

export const useTeamInvitationsStore = defineStore('teamInvitation', {
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
    async addTeamInvitation(newTeamInvitation: TeamInvitation) {
      const apiResponse = await http.post(
        '/team-invitations',
        newTeamInvitation
      );
      this.teamInvitations = [...this.teamInvitations, apiResponse.data];
    },
    async updateTeamInvitation(id: number, currentTeamInvitation: TeamInvitation) {
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
