import LOCAL from '@constants/local'

export interface Lang {
  [LOCAL.zh_cn]: string
  [LOCAL.en_us]: string
}


export * as connectLang from './connect'
export * as registerLang from './register'
export * as loginLang from './login'
export * as siderLang from './sider'
export * as headerLang from './header'
export * as walletLang from './wallet'
export * as chatLang from './chat'
export * as metaLang from './meta'