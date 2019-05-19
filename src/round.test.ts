import Round, { MOVE, RESULT } from './Round'

const A = "A"
const B = "B"

describe('playerA chose paper', () => {

  it('paper vs rock = paper wins', () => {
    const playerA = new Round().play(A, { player: A, move: MOVE.paper }, { player: B, move: MOVE.rock })
    expect(playerA.player).toBe(A)
    expect(playerA.result).toBe(RESULT.win)
  })

  it('paper vs scissor = paper lost', () => {
    const playerA = new Round().play(A, { player: A, move: MOVE.paper }, { player: B, move: MOVE.scissor })
    expect(playerA.player).toBe(A)
    expect(playerA.result).toBe(RESULT.lost)
  })

  it('paper vs paper = draw', () => {
    const playerA = new Round().play(A, { player: A, move: MOVE.paper }, { player: B, move: MOVE.paper })
    expect(playerA.player).toBe(A)
    expect(playerA.result).toBe(RESULT.draw)
  })

})

describe('playerA chose rock', () => {

  it('rock vs scissor = rock wins', () => {
    const playerA = new Round().play(A, { player: A, move: MOVE.rock }, { player: B, move: MOVE.scissor })
    expect(playerA.player).toBe(A)
    expect(playerA.result).toBe(RESULT.win)
  })

  it('rock vs paper = rock lost', () => {
    const playerA = new Round().play(A, { player: A, move: MOVE.rock }, { player: B, move: MOVE.paper })
    expect(playerA.player).toBe(A)
    expect(playerA.result).toBe(RESULT.lost)
  })

  it('rock vs rock = draw', () => {
    const playerA = new Round().play(A, { player: A, move: MOVE.rock }, { player: B, move: MOVE.rock })
    expect(playerA.player).toBe(A)
    expect(playerA.result).toBe(RESULT.draw)
  })

})

describe('playerA chose scissor', () => {

  it('scissor vs paper = scissor wins', () => {
    const playerA = new Round().play(A, { player: A, move: MOVE.scissor }, { player: B, move: MOVE.paper })
    expect(playerA.player).toBe(A)
    expect(playerA.result).toBe(RESULT.win)
  })

  it('scissor vs rock = scissor lost', () => {
    const playerA = new Round().play(A, { player: A, move: MOVE.scissor }, { player: B, move: MOVE.rock })
    expect(playerA.player).toBe(A)
    expect(playerA.result).toBe(RESULT.lost)
  })

  it('scissor vs scissor = draw', () => {
    const playerA = new Round().play(A, { player: A, move: MOVE.scissor }, { player: B, move: MOVE.scissor })
    expect(playerA.player).toBe(A)
    expect(playerA.result).toBe(RESULT.draw)
  })

})
