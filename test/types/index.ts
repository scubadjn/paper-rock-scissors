/* tslint:disable */
export namespace TEST {

  export interface IQueryResponse {
  }

  export interface IClient {
  }

  export interface IMain {
    client: IClient
    response: IQueryResponse
  }

  type IStep = RegExp | string;

  type IStepCallback = (this: IMain, ...args: any[]) => void | Promise<any>


  export interface IFeature {
    Given(step: IStep, callback: IStepCallback): void;
    When(step: IStep, callback: IStepCallback): void;
    Then(step: IStep, callback: IStepCallback): void;
    After(callback: any): void;
    Before(callback: any): void;
  }

}
/* tslint:enable */
