export interface TournamentInvitation {
    id: number, 
    invitesTo_tournamentId: number,
    teamId: number, 
    message: string,
    invites_playerId: string,
}
