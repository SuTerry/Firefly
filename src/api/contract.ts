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
  protected _contract: Contract | undefined

  protected async senderChangeMethod(
    methodName: string,
    args?: Record<string, unknown>,
    deposit?: string
  ): Promise<string> {
    const tx = {
      receiverId: this.address,
      actions: [
        {
          methodName,
          args,
          deposit,
        },
      ],
    }

    const res = await window.near!.signAndSendTransaction(tx)

    return window.atob(res.response[0].status.SuccessValue)
  }
  protected async senderChangeMethods(
    actions: SASTParamsActions[]
  ): Promise<string> {
    const tx = {
      receiverId: this.address,
      actions,
    }

    const res = await window.near!.signAndSendTransaction(tx)

    return window.atob(res.response[0].status.SuccessValue)
  }

  protected async senderViewMethod<T>(
    methodName: string,
    args?: Record<string, unknown>
  ): Promise<T> {
    return window.near!.account().viewFunction(this.address, methodName, args)
  }

  protected async near(): Promise<void> {
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
  }

  protected async changeContract(
    methodName: string,
    args?: Record<string, unknown>,
    deposit?: string
  ): Promise<string> {
    const { currentWallet } = store.getState().wallet
    switch (currentWallet) {
      case 'Sender':
        return this.senderChangeMethod(methodName, args, deposit)
      default:
        throw Error()
    }
  }

  protected async changeContracts(
    actions: SASTParamsActions[]
  ): Promise<string> {
    const { currentWallet } = store.getState().wallet
    switch (currentWallet) {
      case 'Sender':
        return this.senderChangeMethods(actions)
      default:
        throw Error()
    }
  }

  protected async viewContract<T>(
    methodName: string,
    args?: Record<string, unknown>
  ): Promise<T> {
    const { currentWallet } = store.getState().wallet
    switch (currentWallet) {
      case 'Sender':
        return this.senderViewMethod<T>(methodName, args)
      default:
        throw Error()
    }
  }
}
