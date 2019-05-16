import Client from './tools/Client'
import { TEST } from './types'

export default abstract class World implements TEST.IMain {
  public client: TEST.IClient
  public response: TEST.IQueryResponse

  constructor(apiUrl: string) {
    this.client = new Client(apiUrl)
    this.response = {} as any
  }

}