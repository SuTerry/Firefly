import Contracts from '@api/contract'
import { Friends } from '@store/modules/friends'

interface UserContract {
  register: (params: { name: string; image: string }) => boolean
  login: (params: { hash: string }) => [string, string]
  get_friend_list: (params: { account_id: string }) => Friends[]
  add_friend: (params: { friend_account_id: string }) => boolean
}

class User extends Contracts {
  changeMethods = ['register', 'login', 'add_friend']

  viewMethods = ['get_friend_list']

  contract(): UserContract {
    return (this._contract as unknown) as UserContract
  }

  async register(name: string, image: string): Promise<boolean> {
    const res = await this.changeContract('register', { name, image })
    return JSON.parse(res)
  }

  async login(hash: string): Promise<[string, string]> {
    const res = await this.changeContract('login', { hash })
    return JSON.parse(res)
  }

  async get_friend_list(account_id: string): Promise<Friends[]> {
    return this.viewContract<Friends[]>('get_friend_list', { account_id })
  }

  async add_friend(friend_account_id: string): Promise<boolean> {
    const res = await this.changeContract('add_friend', { friend_account_id })
    return JSON.parse(res)
  }
}

let instance

export default (() => {
  if (instance) return instance
  instance = new User()
  return instance
})()
