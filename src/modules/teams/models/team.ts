export interface Team {
    id: number, 
    name: string, 
    level: number, 
    game: string, 
    maxPlayers: number,
    leaderPlayerId: number,
    players: number[]
}
