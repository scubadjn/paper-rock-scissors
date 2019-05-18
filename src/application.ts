import * as Express from 'express'
import Game from './Game'
import Play from './Play'
import Storage from './Storage'

export default (app: Express.Application): Express.Application => {
  const storage = new Storage()

  app.post('/games', (req, res) => {
    const game = new Game().create(req.body.player)
    const gameId = storage.insertGame(game)
    const url = `${req.protocol}://${req.get('host')}${req.originalUrl}/${gameId}`
    res.send(url)
  })

  app.get('/games/:gameId', (req, res) => {
    const game = storage.findGame(req.params.gameId)
    res.send(game)
  })

  app.post('/games/:gameId/:action', (req, res) => {
    const prevGame = storage.findGame(req.params.gameId)
    switch (req.params.action) {
      case "join":
      prevGame.playerB = req.body.player
      storage.updateGame(req.params.gameId, prevGame)
      break
      case "paper":
      case "rock":
      case "scissor":
      const play = new Play(prevGame)
      const nextGame = play.playRound({
        move: req.params.action,
        player: req.body.player,
      })
      storage.updateGame(req.params.gameId, nextGame)
      default:
    }
    res.send(prevGame)
  })

  return app
}
