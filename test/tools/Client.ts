import * as Axios from 'axios'
import { TEST } from '../types'

export default class Client implements TEST.IClient {

  private axios: Axios.AxiosInstance

  constructor(baseURL: string) {
    this.axios = Axios.default.create({ baseURL })
  }

  post(url: string, body?: object) {
    return this.axios.post(url, body)
  }

  get(url: string, body?: object) {
    return this.axios.post(url, body)
  }

}
