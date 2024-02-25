export interface TournamentRequestDto {
    name: string,
    level: number,
    game: string,
    type: string,
    description: string,
    minParticipants: number,
    maxParticipants: number,
    minTeamPlayers: number,
    maxTeamPlayers: number,
    participants: number[],
    winnerTeamId: number,
    bestOf: number,
    state: number
}
