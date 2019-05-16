export enum MOVE {
  paper,
  rock,
  scissor,
}

export enum RESULT {
  win = 'win',
  lost = 'lost',
  draw = 'draw',
}

export interface IRound {
  id: string
  move?: MOVE
}

export interface IRoundResult {
  id: string
  result: RESULT
}

export default class Round {

  play(playerA: IRound, playerB: IRound): IRoundResult {
    return {
      id: playerA.id,
      result: this.move(playerA.move, playerB.move),
    }
  }

  move(playerAmove: MOVE, playerBmove: MOVE): RESULT {
    switch (playerAmove) {
      case MOVE.paper:
        return this.playerApaper(playerBmove)
      case MOVE.rock:
        return this.playerBrock(playerBmove)
      case MOVE.scissor:
        return this.playerAscissor(playerBmove)
      default:
        this.isError()
    }
  }

  playerApaper(playerBmove: MOVE): RESULT {
    switch (playerBmove) {
      case MOVE.paper:
        return RESULT.draw
      case MOVE.scissor:
        return RESULT.lost
      case MOVE.rock:
        return RESULT.win
      default:
        this.isError()
    }
  }

  playerBrock(playerBmove: MOVE): RESULT {
    switch (playerBmove) {
      case MOVE.rock:
        return RESULT.draw
      case MOVE.paper:
        return RESULT.lost
      case MOVE.scissor:
        return RESULT.win
      default:
        this.isError()
    }
  }

  playerAscissor(playerBmove: MOVE): RESULT {
    switch (playerBmove) {
      case MOVE.scissor:
        return RESULT.draw
      case MOVE.rock:
        return RESULT.lost
      case MOVE.paper:
        return RESULT.win
      default:
        this.isError()
    }
  }

  private isError() {
    throw new Error('invalid move')
  }

}
