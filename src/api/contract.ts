import { keyStores, KeyPair, Contract, connect } from 'near-api-js'

import store from '@store/index'

import { CONNECTIONCONFIG, CONTRACTID } from './config'


export interface ContractError {
  kind: {
    ExecutionError: string
  }
}

export default class Contracts {
  protected address = CONTRACTID
  protected viewMethods: string[] = []
  protected changeMethods: string[] = []
  // protected contract!: UserContract
  protected _contract!: Contract

  constructor() {
    (async () => {
      const { accountAddress, accessKey } = store.getState().wallet

      const keyStore = new keyStores.InMemoryKeyStore()
      const keyPair = KeyPair.fromString(accessKey!.secretKey)
      await keyStore.setKey(CONNECTIONCONFIG.networkId, accountAddress, keyPair)
      const near = await connect(Object.assign({ keyStore }, CONNECTIONCONFIG))
      const account = await near.account(accountAddress)
      this._contract = new Contract(account, this.address, {
        viewMethods: this.viewMethods,
        changeMethods: this.changeMethods,
      })
    })()
  }
}
