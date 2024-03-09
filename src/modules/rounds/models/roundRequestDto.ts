export interface RoundRequestDto {
    bestOf: number,
    description: string,
    numTeams: number,
    winnerTeamId: number,
    rivals: number[],
    nextRoundId: number,
    tournamentId: number,
    hasWinner: boolean
}
