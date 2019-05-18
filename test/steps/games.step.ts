import { expect, Given, Then, When } from '../setup'

Given('{string} creates a new game',
  async function (player) {
    this.response = await this.client.post('/games', { player })
  })

Then('a link that can be shared should be created',
  async function () {
    this.url = this.response.data
    const [protocol, _, host, path, id] = this.url.split('/')
    expect(protocol).to.equal('http:')
    expect(host.split(':')[0]).to.equal('localhost')
    expect(path).to.equal('games')
    expect(id.length).to.equal(36)
  })

When('{string} should be able to retrive the game created by player {string} and join',
  async function (secondPlayer, firstPlayer) {
    return 'pending'
  })

When('{string} makes a move {string}',
  async function (player, move) {
    return 'pending'
  })

Then('the round should be {string}',
  async function (state) {
    return 'pending'
  })

Then('{string} {string} the round',
  async function (player, result) {
    return 'pending'
  })

Then('the game ends with {string} as the {string}',
  async function (player, result) {
    return 'pending'
  })
