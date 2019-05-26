import { IProvider } from '../providers'
import { IStorage } from '../providers/StorageInterface'
import ApplicationError from '../tools/ApplicationError'
import Game from './Game'
import { MOVE } from './Round'

export default class Application {

  private storage: IStorage

  constructor(provider: IProvider) {
    this.storage = provider.getStorage()
  }

  listGames() {
    return this.storage.findAllGames()
  }

  createGame(player: string): string {
    const game = new Game().create(player)
    return this.storage.insertGame(game)
  }

  getGame(gameId: string) {
    return this.storage.findGame(gameId)
  }

  playRound(gameId: string, player: string, action: MOVE | 'join') {
    const storage = this.storage
    const prevGame = storage.findGame(gameId)
    if (prevGame.gameEnded) {
      throw new ApplicationError(403, "Game has ended.")
    }
    switch (action) {
      case "join":
      if (prevGame.playerA === player) {
        throw new ApplicationError(403, "Player name is taken.")
      }
      prevGame.playerB = player
      storage.updateGame(gameId, prevGame)
      break
      case "paper":
      case "rock":
      case "scissor":
      if (prevGame.playerA !== player) {
        if (prevGame.playerB !== player) {
          throw new ApplicationError(403, "Invalid player name.")
        }
      }
      const game = new Game(prevGame)
      const nextGame = game.play({
        move: action,
        player,
      })
      if (nextGame.rounds.length > 2) {
        nextGame.winner = game.findGameWinner()
        if (nextGame.winner) {
          nextGame.gameEnded = true
        } else {
          nextGame.rounds = []
        }
      }
      storage.updateGame(gameId, nextGame)
      default:
    }
    return prevGame
  }

}
