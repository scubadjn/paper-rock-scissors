import { IGame } from '../lib/Game'

export interface IStorage {
  insertGame: (game: IGame) => string
  updateGame: (gameId: string, nextGame: IGame) => void
  findGame: (gameId: string) => IGame
  findAllGames: () => IGame[]
}
