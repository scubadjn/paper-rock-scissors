import * as Express from 'express'
import Game from './Game'
import Storage from './Storage'

export default (app: Express.Application): Express.Application => {
  const storage = new Storage()

  app.post('/games', (req, res) => {
    const game = new Game().create(req.body.player)
    storage.insertGame(game)
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}/${game.id}`
    res.send(url)
  })

  app.get('/games/:gameId', (req, res) => {
    const game = storage.findGame(req.params.gameId)
    res.send(game)
  })

  return app
}
