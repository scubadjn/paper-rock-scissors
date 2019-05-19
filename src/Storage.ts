import * as uuid from 'uuid/v4'
import { IGame } from './Game'

export interface IStorage {
  insertGame: (game: IGame) => string
  updateGame: (gameId: string, nextGame: IGame) => void
  findGame: (gameId: string) => IGame
  findAllGames: () => IGame[]
}

export default class Storage implements IStorage {

  private store: Map<string, IGame>

  constructor() {
    this.store = new Map()
  }

  insertGame(game: IGame): string {
    const id = uuid()
    game.id = id
    this.store.set(id, game)
    return id
  }

  updateGame(gameId: string, nextGame: IGame) {
    this.store.set(gameId, nextGame)
  }

  findGame(gameId: string): IGame {
    return this.store.get(gameId)
  }

  findAllGames() {
    const games = []
    this.store.forEach((game) => games.push(game))
    return games
  }
}
