import * as uuid from 'uuid/v4'
import { IGame } from '../lib/Game'
import { IStorage } from './StorageInterface'

export default class StorageStub implements IStorage {

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
