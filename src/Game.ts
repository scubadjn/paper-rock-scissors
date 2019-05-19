import { IRound, IRoundResult } from './Round'

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

}
