import { CONTRACTID } from '@api/config'

const eventFunction = () => window.location.reload()

export const getNearWallet = (): boolean =>
  typeof window.near !== 'undefined' && window.near.isSender

export const connectWallet: () => Promise<string> = async () => {

  const { accessKey } = await window.near?.requestSignIn({
    contractId: CONTRACTID,
  })
  return accessKey
}

export const getAccountId = (): string => {
  let accountId = ''
  if (!window.near) return accountId
  const isSignedIn = window.near.isSignedIn()
  if (!isSignedIn) return accountId
  accountId = window.near.getAccountId()
  return accountId
}


export const onWalletEvent: () => Promise<void> = async () => {
  if (!window.near) return
  window.near.on('accountChanged', eventFunction)
  window.near.on('rpcChanged', eventFunction)
  window.near.on('signOut', eventFunction)
}
