export interface TeamRequestDto {
    name: string, 
    level: number, 
    game: string, 
    maxPlayers: number,
    leaderPlayerId: number,
    players: number[]
}
