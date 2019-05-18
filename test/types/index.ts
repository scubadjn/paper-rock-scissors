import { AxiosPromise } from 'axios'

/* tslint:disable */
export namespace TEST {

  export interface IQueryResponse {
  }

  export interface IClient {
    post:<T> (url: string, body?: object) => AxiosPromise<T>
    get:<T> (url: string, body?: object) => AxiosPromise<T>
  }

  export interface IMain {
    client: IClient
    response: IQueryResponse
  }

  type IStep = RegExp | string;

  type IStepCallback = (this: IMain, ...args: any[]) => void | Promise<any>


  export interface IFeature {
    Given(step: IStep, callback: IStepCallback): void | string;
    When(step: IStep, callback: IStepCallback): void | string;
    Then(step: IStep, callback: IStepCallback): void | string;
    After(callback: any): void | string;
    Before(callback: any): void | string;
  }

}
/* tslint:enable */
