import { IStorage } from './StorageInterface'
import StorageStub from './StorageStub'

export interface IProvider {
  getStorage: () => IStorage
}

export default class Provider implements IProvider {

  private storage: IStorage

  constructor(dbPath: string) {
    if (dbPath === 'memory') {
      this.storage = new StorageStub()
    } else {
      throw new Error('invalid storage provider')
    }
  }

  getStorage() {
    return this.storage
  }

}
