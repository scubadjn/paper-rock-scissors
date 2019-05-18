import * as Express from 'express'
import * as swaggerUi from 'swagger-ui-express'

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
      const { config } = this
      const express = this.app()
      this.instance = await express.listen({ port: config.port })
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
    const app = Express()
    const docsPath = './docs.json'
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(require(docsPath)))
    return app
  }

}
