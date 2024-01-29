export interface Tournament {
    id: number,
    name: string,
    level: string,
    game: string,
    type: string,
    description: string,
    minParticipants: number,
    maxParticipants: number,
    minTeamPlayers: number,
    maxTeamPlayers: number
}
