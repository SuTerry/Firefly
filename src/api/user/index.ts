import Contracts from '@api/contract'
import { Friends } from '@store/modules/friends'

interface UserContract {
  register: (params: { name: string; image: string }) => boolean
  login: (params: { hash: string }) => [string, string]
  get_friend_list: () => Friends[]
  add_friend: (params: { friend_account_id: string }) => boolean
}

class User extends Contracts {
  changeMethods = ['register', 'login', 'add_friend']

  viewMethods = ['get_friend_list']

  contract(): UserContract {
    return (this._contract as unknown) as UserContract
  }

  async register(name: string, image: string): Promise<boolean> {
    return this.contract().register({ name, image })
  }

  async login(hash: string): Promise<[string, string]> {
    return this.contract().login({ hash })
  }

  async get_friend_list(): Promise<Friends[]> {
    return this.contract().get_friend_list()
  }

  async add_friend(friend_account_id: string): Promise<boolean> {
    return this.contract().add_friend({ friend_account_id })
  }
}

let instance

export default (() => {
  if (instance) return instance
  instance = new User()
  return instance
})()
