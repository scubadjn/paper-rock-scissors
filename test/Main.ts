import * as cucumber from 'cucumber'
import Setup from './setup'

export default class Main extends Setup {
  constructor() {
    super()
  }
}

cucumber.setWorldConstructor(Main)
