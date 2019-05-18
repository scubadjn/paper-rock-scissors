import * as uuid from 'uuid/v4'
import { IGame } from './Game'

interface INewGame {
  game: IGame
  id: string
}

export default class Storage {

  private store: Map<string, IGame>

  constructor() {
    this.store = new Map()
  }

  insertGame(game: IGame): INewGame {
    const newGame = {
      game,
      id: uuid(),
    }
    this.store.set(newGame.id, newGame.game)
    return newGame
  }

  updateGame(gameId: string, nextGame: IGame) {
    this.store.set(gameId, nextGame)
  }

  findGame(gameId: string): IGame {
    return this.store.get(gameId)
  }

}
