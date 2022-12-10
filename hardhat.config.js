require("@nomicfoundation/hardhat-toolbox");
const API_URL = process.env['API_URL']
const PRIVATE_KEY = process.env['PRIVATE_KEY']
console.log(process.env['PRIVATE_KEY'])
/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.17",
  defaultNetwork: "goerli",
  networks: {
    hardhat: {},
    goerli: {
      url: API_URL,
      accounts: [`0x${PRIVATE_KEY}`],
    },
  },
};
