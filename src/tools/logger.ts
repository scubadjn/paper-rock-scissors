export interface ILogger {
  warn: (msg: string, obj: any) => void
  error: (msg: string, obj: any) => void
}

class Logger implements ILogger {

  private level: number

  constructor(level: number) {
    this.level = level
  }

  public warn(msg: string, obj: any) {
    if (this.level >= 1) {
      /* tslint:disable */
      console.log(msg,  obj)
      /* tslint:enable */
    }
  }

  public error(msg: string, obj: any) {
    if (this.level >= 2) {
      /* tslint:disable */
      console.log(msg,  obj)
      /* tslint:enable */
    }
  }

}

export default new Logger(2)
