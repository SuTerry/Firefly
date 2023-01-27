type EventName = 'accountChanged' | 'rpcChanged' | 'signOut'

interface SASTParams {
  receiverId: string
  actions: 
    {
      methodName: string
      args?: Record<sting, unknown>
      gas?: number
      deposit?: string
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
  viewFunction: <T>(contractId: string, methodName: string, args?: Record<sting, unknown>) => Promise<T>
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
