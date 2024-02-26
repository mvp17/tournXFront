export interface TeamRequestDto {
    name: string, 
    level: number, 
    game: string, 
    maxPlayers: number,
    leaderPlayerId: string,
    players: string[]
}
