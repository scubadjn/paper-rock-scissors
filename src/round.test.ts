import Round, { MOVE, RESULT } from './Round'

const A = "A"
const B = "B"

describe('playerA chose paper', () => {

  it('paper vs rock = paper wins', () => {
    const playerA = new Round().play({ id: A, move: MOVE.paper }, { id: B, move: MOVE.rock })
    expect(playerA.id).toBe(A)
    expect(playerA.result).toBe(RESULT.win)
  })

  it('paper vs scissor = paper lost', () => {
    const playerA = new Round().play({ id: A, move: MOVE.paper }, { id: B, move: MOVE.scissor })
    expect(playerA.id).toBe(A)
    expect(playerA.result).toBe(RESULT.lost)
  })

  it('paper vs paper = draw', () => {
    const playerA = new Round().play({ id: A, move: MOVE.paper }, { id: B, move: MOVE.paper })
    expect(playerA.id).toBe(A)
    expect(playerA.result).toBe(RESULT.draw)
  })

})

describe('playerA chose rock', () => {

  it('rock vs scissor = rock wins', () => {
    const playerA = new Round().play({ id: A, move: MOVE.rock }, { id: B, move: MOVE.scissor })
    expect(playerA.id).toBe(A)
    expect(playerA.result).toBe(RESULT.win)
  })

  it('rock vs scissor = rock lost', () => {
    const playerA = new Round().play({ id: A, move: MOVE.rock }, { id: B, move: MOVE.paper })
    expect(playerA.id).toBe(A)
    expect(playerA.result).toBe(RESULT.lost)
  })

  it('rock vs rock = draw', () => {
    const playerA = new Round().play({ id: A, move: MOVE.rock }, { id: B, move: MOVE.rock })
    expect(playerA.id).toBe(A)
    expect(playerA.result).toBe(RESULT.draw)
  })

})

describe('playerA chose scissor', () => {

  it('scissor vs paper = scissor wins', () => {
    const playerA = new Round().play({ id: A, move: MOVE.scissor }, { id: B, move: MOVE.paper })
    expect(playerA.id).toBe(A)
    expect(playerA.result).toBe(RESULT.win)
  })

  it('scissor vs rock = scissor lost', () => {
    const playerA = new Round().play({ id: A, move: MOVE.scissor }, { id: B, move: MOVE.rock })
    expect(playerA.id).toBe(A)
    expect(playerA.result).toBe(RESULT.lost)
  })

  it('scissor vs scissor = draw', () => {
    const playerA = new Round().play({ id: A, move: MOVE.scissor }, { id: B, move: MOVE.scissor })
    expect(playerA.id).toBe(A)
    expect(playerA.result).toBe(RESULT.draw)
  })

})
