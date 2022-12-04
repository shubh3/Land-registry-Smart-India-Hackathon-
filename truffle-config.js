const path = require("path");
require('babel-register');


const HDWalletProvider = require('truffle-hdwallet-provider'); 
const fs = require('fs');
 let secrets; 
 if (fs.existsSync('secrets.json')) 
  { 
    secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));
     }


module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
     rinkeby: { 
      provider: new HDWalletProvider(secrets.mnemonic, 'https://rinkeby.infura.io/v3/'+secrets.infuraApiKey),
       gasPrice: 5000000000,
       network_id: '4'
        },
         kovan: { 
      provider: new HDWalletProvider(secrets.mnemonic, 'https://kovan.infura.io/v3/'+secrets.infuraApiKey),
       network_id: '42',
       gasPrice: 6000000000
        },
         main: { 
      provider: new HDWalletProvider(secrets.mnemonic, 'https://mainnet.infura.io/v3/'+secrets.infuraApiKey),
      gas: 5000000,
      gasPrice: 5000000000,
      confirmations: 2,
      network_id: 1
        },
        
        solc: {
    optimizer: {
      enabled: true,
      runs: 200
    }
  }

  }
};
