import * as Express from 'express'
import Game from './lib/Game'
import { IProvider } from './providers'
import ApplicationError from './tools/ApplicationError'
import Validate from './tools/Validator'

const playerInbody = new Validate().schema({
  properties: {
    player: { type: "string" },
  },
  required: [
    'player',
  ],
  type: 'object',
})

export default (app: Express.Application, provider: IProvider): Express.Application => {
  const storage = provider.getStorage()

  app.get('/games', (_, res) => {
    const games = storage.findAllGames()
    res.send(games)
  })

  app.post('/games', (req, res) => {
    const { body } = req
    playerInbody.validate(body)
    const game = new Game().create(body.player)
    const gameId = storage.insertGame(game)
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}/${gameId}`
    res.send(url)
  })

  app.get('/games/:gameId', (req, res) => {
    const game = storage.findGame(req.params.gameId)
    res.send(game)
  })

  app.post('/games/:gameId/:action', (req, res) => {
    const { body } = req
    playerInbody.validate(body)
    const prevGame = storage.findGame(req.params.gameId)
    if (prevGame.gameEnded) {
      throw new ApplicationError(403, "Game has ended.")
    }
    switch (req.params.action) {
      case "join":
      if (prevGame.playerA === body.player) {
        throw new ApplicationError(403, "Player name is taken.")
      }
      prevGame.playerB = body.player
      storage.updateGame(req.params.gameId, prevGame)
      break
      case "paper":
      case "rock":
      case "scissor":
      if (prevGame.playerA !== body.player) {
        if (prevGame.playerB !== body.player) {
          throw new ApplicationError(403, "Invalid player name.")
        }
      }
      const game = new Game(prevGame)
      const nextGame = game.play({
        move: req.params.action,
        player: req.body.player,
      })
      if (nextGame.rounds.length > 2) {
        nextGame.winner = game.findGameWinner()
        if (nextGame.winner) {
          nextGame.gameEnded = true
        } else {
          nextGame.rounds = []
        }
      }
      storage.updateGame(req.params.gameId, nextGame)
      default:
    }
    res.send(prevGame)
  })

  return app
}
