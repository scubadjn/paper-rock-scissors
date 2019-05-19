export enum MOVE {
  paper = 'paper',
  rock = 'rock',
  scissor = 'scissor',
}

export enum RESULT {
  win = 'win',
  lost = 'lost',
  draw = 'draw',
}

export interface IRound {
  player: string
  move?: MOVE
}

export interface IRoundResult {
  player: string
  result: RESULT
}

export default class Round {

  play(gameCreator: string, playerA: IRound, playerB: IRound): IRoundResult {
    if (gameCreator === playerA.player) {
      return {
        player: playerA.player,
        result: this.move(playerA.move, playerB.move),
      }
    }
    return {
      player: playerB.player,
      result: this.move(playerB.move, playerA.move),
    }
  }

  move(playerAmove: MOVE, playerBmove: MOVE): RESULT {
    switch (playerAmove) {
      case MOVE.paper:
        return this.playerApaper(playerBmove)
      case MOVE.rock:
        return this.playerArock(playerBmove)
      case MOVE.scissor:
        return this.playerAscissor(playerBmove)
      default:
        throw new Error('invalid move')
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
        throw new Error('invalid move')
    }
  }

  playerArock(playerBmove: MOVE): RESULT {
    switch (playerBmove) {
      case MOVE.rock:
        return RESULT.draw
      case MOVE.scissor:
        return RESULT.win
      case MOVE.paper:
        return RESULT.lost
      default:
        throw new Error('invalid move')
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
        throw new Error('invalid move')
    }
  }

}
