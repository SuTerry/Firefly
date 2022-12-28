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
          ? 'dev-1672130767742-65176537327251'
          : 'dev-1672130767742-65176537327251'

