import * as Ajv from 'ajv'
import ApplicationError from './ApplicationError'

interface IValidator {
  compile: (schema: object) => IValidator
  validate: (data: object) => void
}

export default class Validator implements IValidator {

  private validateData: any

  compile(schema: object) {
    const ajv = new Ajv()
    this.validate = ajv.compile(schema)
    return this
  }

  validate(data: object): void {
    if (this.validateData(data)) {
      throw new ApplicationError(400)
    }
  }
}
