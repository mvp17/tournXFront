export interface RoundRequestDto {
    bestOf: number,
    numTeams: number,
    winnerTeamId: number,
    rivals: number[],
    nextRoundId: number,
    tournamentId: number,
    hasWinner: boolean
}
