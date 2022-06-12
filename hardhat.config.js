require("dotenv").config();

require("@nomiclabs/hardhat-etherscan");
require("@nomiclabs/hardhat-waffle");
require("hardhat-deploy");
require("hardhat-contract-sizer");
require("hardhat-gas-reporter");
require("solidity-coverage");
require("hardhat-deploy");

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  defaultNetwork:"hardhat",
  networks:{
    hardhat:{
      chainId: 31337,
      blockConfirmations:1
    },
    rinkeby:{
      url: process.env.RINKEBY_RPC_URL || "",
      accounts: process.env.PRIVATE_KEY !== undefined ? [process.env.PRIVATE_KEY] : [],
      chainId:4,
      blockConfirmations:6
    }
  },
  namedAccounts:{
    deployer:{
      default:0
    },
    someUser:{
      default:1
    }
  },
  gasReporter:{
    enabled: false,
    outputFile: "gas-report.txt",
    noColors:true,
    currency: "USD",
    coinmarketcap: process.env.COINMARKET,
    token: "ETH"
  },
  etherscan: {
    apiKey: process.env.ETHERSCAN_API_KEY,
  },
  mocha:{
    timeout: 1000000
  },
  solidity: "0.8.7",
};
