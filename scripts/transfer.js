const { API_URL } = process.env;
const { createAlchemyWeb3 } = require("@alch/alchemy-web3");
const {abi} = require("../artifacts/contracts/MyNFT.sol/MyNFT.json").abi;

const contract_address = '0x95806E5C4Bc3CbaF0bD05FFc740D22E9EdFA2dcE'
require('dotenv').config();


async function main() {
    const web3 = createAlchemyWeb3(API_URL_TEST);  
    web3.eth.getAccounts().then(accounts => {
        const account = account[0]
        const nameContract = web3.eth.Contract(abi, contract_address);
        txn = nameContract.methods.transfer(account, '0x2251A41D1Ba5f9AfF0769be0C22ef1b522C308dd', 5).send();
        console.log(txn)
    })
        .catch(e => console.log(e));
}
main();