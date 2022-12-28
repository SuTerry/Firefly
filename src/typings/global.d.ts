
type EventName = 'accountChanged' | 'rpcChanged' | 'signOut'

interface Window {
  near?: {
    isSender: boolean
    requestSignIn: ({contractId: string}) => Promise<viod>
    isSignedIn: () => boolean
    getAccountId: () => sting
    on: (event: EventName, fun: () => void) => void
  }
}