import { create, IPFS } from 'ipfs-core'

let _ipfs: IPFS | undefined = undefined

const createIpfs = async () => {
  if (_ipfs) return _ipfs
  return (_ipfs = await create())
}

export const add = async (file: File): Promise<string> => {
  const ipfs = await createIpfs()

  try {
    const added = await ipfs.add(file)
    return added.cid.toString()
  } catch (error) {
    throw Error(error as string)
  }
}

export const cat = async <T>(cids: string[]): Promise<T[]> => {
  const ipfs = await createIpfs()

  const examJson: Promise<T>[] = []

  cids.forEach((cid) => {
    examJson.push(
      new Promise(async (resolve) => {
        const cated = await ipfs.cat(cid)
        for await (const current of cated) {
          resolve(JSON.parse(utf8ArrayToStr(current)))
        }
      })
    )
  })

  return await Promise.all(examJson)
}

export const path = (hash: string): string => `https://ipfs.io/ipfs/${hash}`

const utf8ArrayToStr = (array: Uint8Array): string => {
  const len = array.length
  let out, i, c, char2, char3

  out = ''

  i = 0
  while (i < len) {
    c = array[i++]
    switch (c >> 4) {
      case 0:
      case 1:
      case 2:
      case 3:
      case 4:
      case 5:
      case 6:
      case 7:
        out += String.fromCharCode(c)
        break
      case 12:
      case 13:
        char2 = array[i++]
        out += String.fromCharCode(((c & 0x1f) << 6) | (char2 & 0x3f))
        break
      case 14:
        char2 = array[i++]
        char3 = array[i++]
        out += String.fromCharCode(
          ((c & 0x0f) << 12) | ((char2 & 0x3f) << 6) | ((char3 & 0x3f) << 0)
        )
        break
    }
  }

  return out
}
