export interface IApplicationError {
  status: number
  message: string
}

export default class ApplicationError extends Error implements IApplicationError {
  public status: number
  constructor(status?: number, message?: string) {
    super()
    Error.captureStackTrace(this, this.constructor)
    this.name = this.constructor.name
    this.message = message || 'Internal server error'
    this.status = status || 500
  }
}
