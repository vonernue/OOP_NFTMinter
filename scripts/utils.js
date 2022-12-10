require('dotenv').config();

const { Readable } = require("stream");
const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = process.env.PINATA_JWT

const ethers = require('ethers');
const contract = require("../artifacts/contracts/MyNFT.sol/MyNFT.json");

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.providers.AlchemyProvider('goerli', API_KEY)

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi
const contractAddress = '0x95806E5C4Bc3CbaF0bD05FFc740D22E9EdFA2dcE'

// Create a contract instance
const myNftContract = new ethers.Contract(contractAddress, abi, signer)

// Pin File to IPFS using Pinata
const pinFileToIPFS = async (fileName, buffer) => {
    const stream = Readable.from(buffer);
    const formData = new FormData();
    
    formData.append('file', stream, {
        filepath: 'image.png',
    })
    
    const metadata = JSON.stringify({
      name: fileName,
    });
    formData.append('pinataMetadata', metadata);
    
    const options = JSON.stringify({
      cidVersion: 0,
    })
    formData.append('pinataOptions', options);

    try{
      const res = await axios.post("https://api.pinata.cloud/pinning/pinFileToIPFS", formData, {
        maxBodyLength: "Infinity",
        headers: {
          'Content-Type': `multipart/form-data; boundary=${formData._boundary}`,
          Authorization: 'Bearer ' + JWT
        }
      });
    //   console.log(res.data);
      return res.data
    } catch (error) {
      console.log(error);
    }
}

// Pin JSON to IPFS using Pinata
const pinJSONToIPFS = async (imgHash) => {
    var axios = require('axios');
    var data = JSON.stringify({
    "pinataOptions": {
        "cidVersion": 1
    },
    "pinataMetadata": {
        "name": "OOPNFTMetadata001",
    },
    "pinataContent": {
        "description": "OOP Project NFT 002",
        "image": "https://gateway.pinata.cloud/ipfs/" + imgHash,
        "name": "OOPNFT001",
    }
    });

    var config = {
        method: 'post',
        url: 'https://api.pinata.cloud/pinning/pinJSONToIPFS',
        headers: { 
            'Content-Type': 'application/json', 
            'Authorization': 'Bearer ' + JWT
        },
        data : data
    };

    const res = await axios(config);
    return res.data
}

// Call mintNFT function
const mintNFT = async (buffer) => {

    // Upload NFT data to IPFS
    res = await pinFileToIPFS('OOPNFT02', buffer)
    imgIpfsHash = res.IpfsHash
    console.log('Image uploaded to IPFS: ' + imgIpfsHash)
    res = await pinJSONToIPFS(imgIpfsHash)
    metadataIpfsHash = res.IpfsHash
    console.log('Metadata uploaded to IPFS: ' + metadataIpfsHash)

    // Construct NFT metadata uri
    tokenUri = "https://gateway.pinata.cloud/ipfs/" + metadataIpfsHash

    let nftTxn = await myNftContract.mintNFT(signer.address, tokenUri)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://goerli.etherscan.io/tx/${nftTxn.hash}`)
}

exports.mintNFT = mintNFT

// stream = fs.readFile('./stream.txt', 'utf8', function(err, data) {
//     if (err) throw err;
//     console.log('OK: ' + filename);
//     console.log(data)
//   });


// mintNFT(stream)
//     .then(() => process.exit(0))
//     .catch((error) => {
//         console.error(error);
//         process.exit(1);
//     });