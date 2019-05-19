import * as bodyParser from 'body-parser'
import * as Express from 'express'
import * as swaggerUi from 'swagger-ui-express'
import application from './application'

interface IServerConstructor {
  port: number
}

export default class Server {
  private instance: any
  private config: IServerConstructor

  constructor(config: IServerConstructor) {
    this.config = config
  }

  public async start() {
    try {
      this.instance = await this.app().listen({
        port: this.config.port,
      })
      const { port } = this.instance.address()
      return { port }
    } catch (e) {
      throw new Error("failed to start api")
    }
  }

  public close() {
    this.instance.close()
  }

  private app() {
    const express = Express()
    express.use(bodyParser.json())
    const app = application(express)
    const docsPath = './docs.json'
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(require(docsPath)))
    return app
  }

}
