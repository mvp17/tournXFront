export interface Team {
    id: number, 
    name: string, 
    level: number, 
    game: string, 
    maxPlayers: number,
    leaderPlayerId: string,
    players: string[],
    action: string
}
