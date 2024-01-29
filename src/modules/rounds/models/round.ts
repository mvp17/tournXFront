export interface Round {
    id: number,
    bestOf: number,
    numTeams: number,
    winner: number,
    rivals: number,
    nextRound: number,
    tournament: number,
    hasWinner: boolean
}
