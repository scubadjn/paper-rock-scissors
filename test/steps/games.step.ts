import { expect, Given, Then, When } from '../setup'

Given('{string} creates a new game',
  async function(player) {
    this.response = await this.client.post('/games', { player })
    this.url = this.response.data
  })

Then('a link that can be shared should be created',
  async function() {
    const [protocol, _, host, path, id] = this.url.split('/')
    expect(protocol).to.equal('http:')
    expect(host.split(':')[0]).to.equal('localhost')
    expect(path).to.equal('games')
    expect(id.length).to.equal(36)
    this.game.id = id
  })

When('an other player should be able to retrive the game created by player {string}',
  async function(firstPlayer) {
    this.response = await this.client.get(`/games/${this.game.id}`)
    this.game = this.response.data
    expect(this.game.currentRound).to.equal(null)
    expect(this.game.id).to.equal(this.game.id)
    expect(this.game.playerA).to.equal(firstPlayer)
    expect(this.game.playerB).to.equal(null)
  })

When('{string} should be able to join the game',
  async function(secondPlayer) {
    this.response = await this.client.post(`/games/${this.game.id}/join`, { player: secondPlayer })
    this.game = this.response.data
    expect(this.game.currentRound).to.equal(null)
    expect(this.game.id).to.equal(this.game.id)
    expect(this.game.playerB).to.equal(secondPlayer)
  })

When('{string} makes a move {string}',
  async function(player, move) {
    this.response = await this.client.post(`/games/${this.game.id}/${move}`, { player })
    this.game = this.response.data
  })

Then('the round should be {string}',
  async function(result) {
    expect(this.game.rounds[this.game.rounds.length - 1].result).to.equal(result)
  })

Then('{string} {string} the round',
  async function(player, result) {
    this.response = await this.client.get(`/games/${this.game.id}`)
    this.game = this.response.data
    expect(this.game.rounds[this.game.rounds.length - 1].player).to.equal(player)
    expect(this.game.rounds[this.game.rounds.length - 1].result).to.equal(result)
  })

Then('{string} wins the game',
  async function(player) {
    this.response = await this.client.get(`/games/${this.game.id}`)
    this.game = this.response.data
    expect(this.game.winner).to.equal(player)
  })
