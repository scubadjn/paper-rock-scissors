import { IGame } from './Game'
import Round, { IRound, IRoundResult } from './Round'

export default class Play {

  private game: IGame

  constructor(game: IGame) {
    this.game = game
  }

  playRound(round: IRound): IGame {
    if (this.game.currentRound) {
      new Round().play(round, this.game.currentRound)
    } else {
      this.game.currentRound = round
      // waiting for move
      return null
    }
    return this.game
  }

}
