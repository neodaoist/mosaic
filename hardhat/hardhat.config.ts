import dotenv from "dotenv"
import "@typechain/hardhat"
import "@openzeppelin/hardhat-upgrades"
import "@nomiclabs/hardhat-waffle"
import "solidity-coverage"
import "hardhat-gas-reporter"
import "@nomiclabs/hardhat-etherscan"

dotenv.config()

module.exports = {
  defaultNetwork: "hardhat",
  networks: {
    hardhat: { chainId: 1337 },
        rinkeby: {
          url: process.env.URL_RINKEBY,
          accounts: [`0x${process.env.PRIVATE_KEY}`]
          // accounts: {
          //   mnemonic: process.env.MNEMONIC,
          // },
        },
    //     mainnet: {
    //       url: process.env.URL_MAINNET,
    //       accounts: {
    //         mnemonic: process.env.MNEMONIC,
    //       },
    //       // gasPrice:
    //     },
  },
  solidity: {
    version: "0.8.13",
    settings: {
      optimizer: {
        enabled: true,
        runs: 2000,
      },
    },
  },
  paths: {
    sources: "./contracts",
    tests: "test",
    cache: "./cache",
    artifacts: "./artifacts",
  },
  mocha: {
    timeout: 40000,
  },
  etherscan: {
    // apiKey: process.env.ETHERSCAN_KEY,
  },
}
