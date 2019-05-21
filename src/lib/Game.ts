import Round, { IRound, IRoundResult, RESULT } from './Round'

export interface IGame {
  id: string | null
  currentRound: IRound | null
  playerA: string
  playerB: string | null
  winner: string | null
  rounds: IRoundResult[]
  gameEnded: boolean
}

export default class Game {

  private game: IGame

  constructor(game?: IGame) {
    this.game = game
  }

  create(playerA: string): IGame {
    this.game = {
      currentRound: null,
      gameEnded: false,
      id: null,
      playerA,
      playerB: null,
      rounds: [],
      winner: null,
    }
    return this.game
  }

  run(round: IRound): IGame {
    if (this.game.currentRound) {
      const result = this.playRound(round)
      this.game.rounds.push(this.findRoundWinner(result))
      this.game.currentRound = null
    } else {
      this.game.currentRound = round
    }
    return this.game
  }

  findGameWinner(): string {
    let playerAwins: number = 0
    let playerBwins: number = 0
    this.game.rounds.forEach(({ result, player }) => {
      if (result === RESULT.win) {
        if (player === this.game.playerA) {
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

  private findRoundWinner({ result, player }: IRoundResult): IRoundResult {
    if (result === RESULT.lost) {
      return {
        player: player === this.game.playerA ? this.game.playerB : this.game.playerA,
        result: RESULT.win,
      }
    }
    return { result, player }
  }

  private playRound(round: IRound): IRoundResult {
    if (this.game.playerA === round.player) {
      return new Round().play(round, this.game.currentRound)
    }
    return new Round().play(this.game.currentRound, round)
  }

}
