import * as chai from 'chai'
import * as Cucumber from 'cucumber'
import Server from '../src/Server'
import { TEST } from './types'
import World from './World'

const cucumber: TEST.IFeature = Cucumber
const { Given, Then, When } = cucumber
const { expect } = chai

export {
  Given,
  Then,
  When,
  expect,
}

let apiUrl: string
const server = new Server({ port: 0 })

Cucumber.BeforeAll(async () => {
  try {
    const instance = await server.start()
    apiUrl = `http://localhost:${instance.port}`
  } catch (err) {
    throw new Error('failed to run tests' + JSON.stringify(err))
  }
})

Cucumber.AfterAll(() => {
  server.close()
  setTimeout(() => { process.exit(0) }, 50)
})

export default class Setup extends World {
  constructor() {
    super(apiUrl)
  }
}
