import * as Express from 'express'
import Application from './lib/Application'
import { IProvider } from './providers'
import Validate from './tools/Validator'

export default (app: Express.Application, provider: IProvider): Express.Application => {
  const application = new Application(provider)

  const playerInbody = new Validate().compile({
    additionalProperties: false,
    properties: {
      player: { type: "string" },
    },
    required: [
      'player',
    ],
    type: 'object',
  })

  const gameAction = new Validate().compile({
    additionalProperties: false,
    properties: {
      action: {
        enum: ['scissor', 'rock', 'paper', 'join'],
        type: "string",
      },
      gameId: { type: "string" },
    },
    required: [
      'action',
      'gameId',
    ],
    type: 'object',
  })

  app.get('/games', (_, { send }) => {
    send(application.listGames())
  })

  app.post('/games', (req, res) => {
    playerInbody.validate(req.body)
    const { player } = req.body
    const gameId = application.createGame(player)
    res.send(`${req.protocol}://${req.get('host')}${req.originalUrl}/${gameId}`)
  })

  app.get('/games/:gameId', (req, res) => {
    const game = application.getGame(req.params.gameId)
    res.send(game)
  })

  app.post('/games/:gameId/:action', (req, res) => {
    playerInbody.validate(req.body)
    gameAction.validate(req.params)
    const { player } = req.body
    const game = application.playRound(req.params.gameId, player, req.params.action)
    res.send(game)
  })

  return app
}
