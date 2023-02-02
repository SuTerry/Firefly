const env = process.env.WEB_ENV

export const CONNECTIONCONFIG =
  env === 'pro'
    ? {
      network: 'testnet',
      networkId: 'testnet',
      nodeUrl: 'https://rpc.testnet.near.org',
      walletUrl: 'https://wallet.testnet.near.org',
      helperUrl: 'https://helper.testnet.near.org',
      explorerUrl: 'https://explorer.testnet.near.org',
    }
    : env === 'pre'
      ? {
        network: 'testnet',
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
      }
      : env === 'sit'
        ? {
          network: 'testnet',
          networkId: 'testnet',
          nodeUrl: 'https://rpc.testnet.near.org',
          walletUrl: 'https://wallet.testnet.near.org',
          helperUrl: 'https://helper.testnet.near.org',
          explorerUrl: 'https://explorer.testnet.near.org',
        }
        : env === 'dev'
          ? {
            network: 'testnet',
            networkId: 'testnet',
            nodeUrl: 'https://rpc.testnet.near.org',
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org',
            explorerUrl: 'https://explorer.testnet.near.org',
          }
          : {
            network: 'testnet',
            networkId: 'testnet',
            nodeUrl: 'https://rpc.testnet.near.org',
            walletUrl: 'https://wallet.testnet.near.org',
            helperUrl: 'https://helper.testnet.near.org',
            explorerUrl: 'https://explorer.testnet.near.org',
          }

// contractId
export const CONTRACTID =
  env === 'pro'
    ? ''
    : env === 'pre'
      ? ''
      : env === 'sit'
        ? ''
        : env === 'dev'
          ? 'dev-1675150088225-11398664028067'
          : 'dev-1675150088225-11398664028067'

// nft_contractId
export const NFT_CONTRACTID =
  env === 'pro'
    ? ''
    : env === 'pre'
      ? ''
      : env === 'sit'
        ? ''
        : env === 'dev'
          ? 'dev-1674914206505-69800555685557'
          : 'dev-1674914206505-69800555685557'

// websocket
export const WEBSOCKET =
  env === 'pro'
    ? ''
    : env === 'pre'
      ? ''
      : env === 'sit'
        ? ''
        : env === 'dev'
          ? '//54.250.193.38:8888'
          : '//54.250.193.38:8888'

// static
export const STATIC =
  env === 'pro'
    ? ''
    : env === 'pre'
      ? ''
      : env === 'sit'
        ? ''
        : env === 'dev'
          ? './static'
          : '../static'



