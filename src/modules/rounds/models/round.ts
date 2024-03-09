export interface Round {
    id: number,
    description: string,
    bestOf: number,
    numTeams: number,
    winnerTeamId: number,
    rivals: number[],
    nextRoundId: number,
    tournamentId: number,
    hasWinner: boolean
}
