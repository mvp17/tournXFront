import http from '../http-common';
import { defineStore } from 'pinia';

export const useTeamInvitationsStore = defineStore('teamInvitation', {
  state: () => ({
    /** @type {{ id: number, player: string, team: string, message: string }[]} */
    teamInvitations: [],
  }),
  getters: {
    getAll: async (state) => {
      const apiResponse = await http.get('/team-invitations');
      state.teamInvitations = apiResponse.data;
    },
    getById: (state) => {
      return (id) =>
        state.teamInvitations.find(
          (teamInvitation) => teamInvitation.id === id
        );
    },
  },
  actions: {
    async addTeamInvitation(newTeamInvitation) {
      const apiResponse = await http.post(
        '/team-invitations',
        newTeamInvitation
      );
      this.teamInvitations = [...this.teamInvitations, apiResponse.data];
    },
    async updateTeamInvitation(id, currentTeamInvitation) {
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
    async removeTeamInvitation(id) {
      await http.delete(`/team-invitations/${id}`);
      this.teamInvitations = this.teamInvitations.filter(
        (teamInvitation) => teamInvitation.id !== id
      );
    },
  },
});
