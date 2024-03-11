export interface TournamentInvitationRequestDto {
    invitesTo_tournamentId: number,
    teamId: number, 
    message: string,
    invites_playerId: string
}
