import { AxiosResponse } from 'axios'
import { IGame } from '../../src/lib/Game'
import { IClient } from '../tools/Client'

/* tslint:disable */
export namespace TEST {

  export interface IQueryResponse extends AxiosResponse {
  }

  export interface IMain {
    client: IClient
    response: IQueryResponse
    url: string
    game: IGame
    error: any
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
