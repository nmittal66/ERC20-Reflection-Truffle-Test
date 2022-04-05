const HDWalletProvider = require('@truffle/hdwallet-provider');
const fs = require('fs');
const mnemonic = 'inspire blush exclude oak oven dignity point girl inspire negative embark gown';

module.exports = {
  
  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard BSC port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    testnet: {
      provider: () => new HDWalletProvider(mnemonic, `https://data-seed-prebsc-1-s1.binance.org:8545`),
      network_id: 97,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    bsc: {
      provider: () => new HDWalletProvider(mnemonic, `https://bsc-dataseed1.binance.org`),
      network_id: 56,
      confirmations: 10,
      timeoutBlocks: 200,
      skipDryRun: true
    },
  },

  // Set default mocha options here, use special reporters etc.
  // mocha: {
  //    timeout: 100000
  // },
  contracts_directory:'contracts',
  contracts_build_directory:'src/abis',
  
  compilers:{ solc:{ version: '^0.8.11', optimizer:{ enabled: true, runs: 2000 } } },
  plugins: [
    'truffle-contract-size'
  ]
}