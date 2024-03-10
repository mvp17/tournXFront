export interface TeamRequestDto {
    name: string, 
    level: number, 
    game: string, 
    maxPlayers: number,
    // string value because of asp net users generated id
    leaderPlayerId: string,
    players: string[]
}
