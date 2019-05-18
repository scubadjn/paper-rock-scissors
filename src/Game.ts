import { IRound } from './Round'

export interface IGame {
  id: string | null
  currentRound: IRound | null
  playerA: string
  playerB: string | null
}

export default class Game {

  private game: IGame

  create(playerA: string): IGame {
    this.game = {
      currentRound: null,
      id: null,
      playerA,
      playerB: null,
    }
    return this.game
  }

}
