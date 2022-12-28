

import * as Sender from './Sender'

interface WalletMethod {
  getNearWallet: () => boolean
  connectWallet: () => Promise<string>
  getAccountId: () => string
  onWalletEvent: () => Promise<void>

}

const wallets: Record<string, WalletMethod> = {
  Sender,
}

export const getNearWallet: (currentWallet: string) => boolean = (currentWallet) => wallets[currentWallet].getNearWallet()

export const connectToWallet: (currentWallet: string) => Promise<string> = async (currentWallet) => await wallets[currentWallet].connectWallet()

export const getAccountId: (currentWallet: string) => string = (currentWallet) => wallets[currentWallet].getAccountId()

export const onWalletEvent: (currentWallet: string) => Promise<void> = async (currentWallet) => await wallets[currentWallet].onWalletEvent()
