import Contracts from '@api/contract'
import type { Friends } from '@store/modules/friends'
import type { Room } from '@store/modules/room'
interface RoomListRes {
  0: number
  1: Room
}

class User extends Contracts {
  changeMethods = ['register', 'login', 'add_friend']

  viewMethods = ['get_friend_list']

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

  async add_friend(friend_account_id: string): Promise<Friends> {
    const res = await this.changeContract('add_friend', { friend_account_id })
    return JSON.parse(res)
  }

  async get_room_list(): Promise<RoomListRes[]> {
    return this.viewContract<RoomListRes[]>('get_room_list')
  }

  async create_room(name: string, nft: string[]): Promise<number> {
    const res = await this.changeContract('create_room', { name, nft })
    return JSON.parse(res)
  }

  async destory_room(room_id: number): Promise<number> {
    const res = await this.changeContract('destory_room', { room_id })
    return JSON.parse(res)
  }

  async account_info(account_id: string): Promise<[string, string]> {
    return this.viewContract<[string, string]>('account_info', { account_id })
  }
}

let instance

export default (() => {
  if (instance) return instance
  instance = new User()
  return instance
})()
