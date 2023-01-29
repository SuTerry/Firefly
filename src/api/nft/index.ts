import Contracts from '@api/contract'
import { NFT_CONTRACTID } from '@api/config'

export interface Token {
  token_id: string
  metadata: {
    title: string
    media: string
  }
}

class Nft extends Contracts {
  address = NFT_CONTRACTID

  async nft_mint(receiver_ids: string[]): Promise<boolean> {
    const methodName = 'nft_mint'
    const token_series_id = '1'
    const deposit = '100000000000000000000000'
    const actions = receiver_ids.map((receiver_id) => ({
      methodName,
      args: { token_series_id, receiver_id },
      deposit,
    }))
    const res = await this.changeContracts(actions)
    return JSON.parse(res)
  }

  async nft_tokens_owner(owner_id: string): Promise<Token[]> {
    return this.viewContract<Token[]>('nft_tokens_owner', { owner_id })
  }
}

let instance

export default (() => {
  if (instance) return instance
  instance = new Nft()
  return instance
})()
