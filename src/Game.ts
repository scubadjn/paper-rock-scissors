import * as uuid from 'uuid/v4'
import Round, { IRound, IRoundResult } from './Round'

export interface IGame {
  id: string
  currentRound: IRound | null
  playerA: string
  playerB: string | null
}

export default class Game {

  private game: IGame

  create(playerA: string): IGame {
    this.game = {
      currentRound: null,
      id: uuid(),
      playerA,
      playerB: null,
    }
    return this.game
  }

  setGame(game: IGame) {
    this.game = game
  }

  playRound(round: IRound): IRoundResult | null {
    if (this.game.currentRound) {
      return new Round().play(round, this.game.currentRound)
    } else {
      this.game.currentRound = round
      // waiting for move
      return null
    }
  }

}
