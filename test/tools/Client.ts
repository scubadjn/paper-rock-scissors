import * as Axios from 'axios'
import { AxiosPromise } from 'axios'

export interface IClient {
  post: <T> (url: string, body?: object) => AxiosPromise<T>
  get: <T> (url: string, body?: object) => AxiosPromise<T>
}

export default class Client implements IClient {

  private axios: Axios.AxiosInstance

  constructor(baseURL: string) {
    this.axios = Axios.default.create({ baseURL })
  }

  post(url: string, body?: object) {
    return this.axios.post(url, body)
  }

  get(url: string, body?: object) {
    return this.axios.get(url, body)
  }

}
