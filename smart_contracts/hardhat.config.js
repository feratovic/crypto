//https://eth-ropsten.alchemyapi.io/v2/80q_uxN6bU6jNwh8A5H6WuzuwbcjtQMi

require("@nomiclabs/hardhat-waffle");

module.exports = {
  solidity: '0.8.0',
  networks: {
    ropsten: {
      url: 'https://eth-ropsten.alchemyapi.io/v2/80q_uxN6bU6jNwh8A5H6WuzuwbcjtQMi',
      accounts: [ '75825fc4310ae238fd6c7d2384cbd8ee0c2714f79593c4d25aea06136d67dee6' ],
    }
  }
}