import * as bodyParser from 'body-parser'
import * as Express from 'express'
import * as swaggerUi from 'swagger-ui-express'
import application from './application'
import Provider from './providers'
import { IApplicationError } from './tools/ApplicationError'
import logger from './tools/logger'

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
    } catch (err) {
      const msg = 'failed to start api'
      logger.error(msg, err)
      throw new Error(msg)
    }
  }

  public close() {
    this.instance.close()
  }

  private app() {
    const express = Express()
    express.use(bodyParser.json())
    const app = application(express, new Provider('memory'))
    const docsPath = '../docs.json'
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(require(docsPath)))
    app.use(({ status, message}: IApplicationError, _, res: Express.Response, __) => {
      res.status(status).send(message)
    })
    return app
  }

}
