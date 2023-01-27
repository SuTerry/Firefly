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

  async nft_mint(receiver_id: string): Promise<boolean> {
    const token_series_id = '3'
    const res = await this.changeContract(
      'nft_mint',
      {
        token_series_id,
        receiver_id,
      },
      '100000000000000000000000'
    )
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
