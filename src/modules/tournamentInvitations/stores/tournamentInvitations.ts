import http from '../../../http-common';
import { defineStore } from 'pinia';
import { TournamentInvitation } from '../models/tournamentInvitation';

export const useTournamentInvitationsStore = defineStore(
  'tournamentInvitation',
  {
    state: () => ({
      tournamentInvitations: [] as TournamentInvitation[],
    }),
    getters: {
      getAll: async (state) => {
        const apiResponse = await http.get('/tournament-invitations');
        state.tournamentInvitations = apiResponse.data;
      },
      getById: (state) => {
        return (id: number) =>
          state.tournamentInvitations.find(
            (tournamentInvitation) => tournamentInvitation.id === id
          );
      },
    },
    actions: {
      async addTournamentInvitation(newTournamentInvitation: TournamentInvitation) {
        const apiResponse = await http.post(
          '/tournament-invitations',
          newTournamentInvitation
        );
        this.tournamentInvitations = [
          ...this.tournamentInvitations,
          apiResponse.data,
        ];
      },
      async updateTournamentInvitation(id: number, currentTournamentInvitation: TournamentInvitation) {
        const apiResponse = await http.put(
          `/tournament-invitations/${id}`,
          currentTournamentInvitation
        );
        let tournamentInvitationsState = this.tournamentInvitations.filter(
          (tournamentInvitation) => tournamentInvitation.id !== id
        );
        tournamentInvitationsState.push(apiResponse.data);
        this.tournamentInvitations = tournamentInvitationsState;
      },
      async removeTournamentInvitation(id: number) {
        await http.delete(`/tournament-invitations/${id}`);
        this.tournamentInvitations = this.tournamentInvitations.filter(
          (tournamentInvitation) => tournamentInvitation.id !== id
        );
      },
    },
  }
);