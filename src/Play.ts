import { IGame } from './Game'
import Round, { IRound, RESULT } from './Round'

interface IGameEndedResult {
  winner: string
}

export default class Play {

  private game: IGame

  constructor(game: IGame) {
    this.game = game
  }

  playRound(round: IRound): IGame {
    if (this.game.currentRound) {
      const result = new Round().play(this.game.playerA, round, this.game.currentRound)
      this.game.rounds.push(result)
      this.game.currentRound = null
    } else {
      this.game.currentRound = round
    }
    return this.game
  }

  findWinner(): string {
    let playerAwins: number = 0
    let playerBwins: number = 0
    this.game.rounds.forEach(({ result, player }) => {
      if (result === RESULT.win) {
        if (player ===this.game.playerA) {
          playerAwins += 1
        } else {
          playerBwins += 1
        }
      }
    })
    if (playerAwins > playerBwins) {
      return this.game.playerA
    } else if (playerAwins < playerBwins) {
      return this.game.playerB
    }
    return null
  }

}
