type EventName = 'accountChanged' | 'rpcChanged' | 'signOut'

interface SASTParams {
  receiverId: string
  actions: 
    {
      methodName: string
      args?: Record<sting, string>
      gas?: number
      deposit?: number
    }[]
}
interface SASTResult {
  response: [
    {
      status: {
        SuccessValue: string
      }
    }
  ]
}

interface Account {
  viewFunction: <T>(contractId: string, methodName: string, args?: Record<sting, string>) => Promise<T>
}


interface Window {
  near?: {
    isSender: boolean
    requestSignIn: ({ contractId: string }) => Promise<viod>
    isSignedIn: () => boolean
    getAccountId: () => sting
    on: (event: EventName, fun: () => void) => void
    signAndSendTransaction: (params: SASTParams) => SASTResult
    account: () => Account
  }
}
