// import ApplicationError from './ApplicationError'
import Validator from './Validator'

const validator = new Validator().compile({
  additionalProperties: false,
  properties: {
    player: { type: "string" },
  },
  required: [
    'player',
  ],
  type: 'object',
})

describe('validator', () => {

  it('should let valid data pass', () => {
    expect(validator.validate({ player: "world" })).toBe(undefined)
  })

  it('should throw an error with invalid data', () => {
    // jest does not validate status
    // const err = () => validator.validate({ hello: "world" })
    // expect(err).toThrowError(new ApplicationError(400, 'Bad Request'))
    try {
      validator.validate({ hello: "world" })
      expect(false)
    } catch (error) {
      expect(error.status).toEqual(400)
      expect(error.message).toEqual('Bad Request')
    }
  })

})
