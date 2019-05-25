import * as Ajv from 'ajv'
import * as Express from 'express'
import Game from './lib/Game'
import Storage from './Storage'
import ApplicationError from './tools/ApplicationError'

const ajv = new Ajv()

const playerBodySchema = {
  properties: {
    player: { type: "string" },
  },
  required: [
    'player',
  ],
  type: 'object',
}

const playerInbody = ajv.compile(playerBodySchema)

export default (app: Express.Application): Express.Application => {
  const storage = new Storage()

  app.get('/games', (_, res) => {
    const games = storage.findAllGames()
    res.send(games)
  })

  app.post('/games', (req, res) => {
    const { body } = req
    if (!playerInbody(body)) {
      throw new ApplicationError(400)
    }
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
    if (!playerInbody(body)) {
      throw new ApplicationError(400)
    }
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
      const play = new Game(prevGame)
      const nextGame = play.run({
        move: req.params.action,
        player: req.body.player,
      })
      if (nextGame.rounds.length > 2) {
        nextGame.winner = play.findGameWinner()
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
