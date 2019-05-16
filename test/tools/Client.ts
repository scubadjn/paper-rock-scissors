import { TEST } from '../types'

export default class Client implements TEST.IClient {

  private url: string

  constructor(url: string) {
    this.url = `${url}/graphql`
  }

}
