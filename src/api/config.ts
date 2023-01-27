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
          ? 'dev-1674055482572-51246805406720'
          : 'dev-1674055482572-51246805406720'
          // : 'dev-1672318794070-83988914819590'

// nft_contractId
export const NFT_CONTRACTID =
  env === 'pro'
    ? ''
    : env === 'pre'
      ? ''
      : env === 'sit'
        ? ''
        : env === 'dev'
          ? 'dev-1674793810016-86541864832729'
          : 'dev-1674793810016-86541864832729'

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



