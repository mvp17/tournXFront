import http from '../../../http-common';
import { defineStore } from 'pinia';
import { TournamentInvitation } from '../models/tournamentInvitation';
import { TournamentInvitationRequestDto } from '../models/tournamentInvitationRequestDto';
import { useUserStore } from '../../users/stores/userStore';

export const useTournamentInvitationsStore = defineStore('tournamentInvitations', {
    state: () => ({
      tournamentInvitations: [] as TournamentInvitation[],
    }),
    getters: {
      getAll: async (state) => {
        http.interceptors.request.use(async (request) => {
          const token = useUserStore.getUser.token;
          if (token !== "") request.headers.Authorization = `Bearer ${token}`;
          return request;
        });
        const apiResponse = await http.get('/tournamentInvitation');
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
      async addTournamentInvitation(newTournamentInvitation: TournamentInvitationRequestDto) {
        const apiResponse = await http.post(
          '/tournament-invitations',
          newTournamentInvitation
        );
        this.tournamentInvitations = [
          ...this.tournamentInvitations,
          apiResponse.data,
        ];
      },
      async updateTournamentInvitation(id: number, currentTournamentInvitation: TournamentInvitationRequestDto) {
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
