import * as Ajv from 'ajv'
import ApplicationError from './ApplicationError'

export default class Validator {

  private validateData: any

  schema(schema: object) {
    const ajv = new Ajv()
    this.validate = ajv.compile(schema)
    return this
  }

  validate(data: object) {
    if (this.validateData(data)) {
      throw new ApplicationError(400)
    }
  }
}
