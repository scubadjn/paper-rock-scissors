import { IGame } from '../src/Game'
import Client, { IClient } from './tools/Client'
import { TEST } from './types'

export default abstract class World implements TEST.IMain {
  public client: IClient
  public response: TEST.IQueryResponse
  public url: string
  public game: IGame = {} as IGame

  constructor(apiUrl: string) {
    this.client = new Client(apiUrl)
  }

}
