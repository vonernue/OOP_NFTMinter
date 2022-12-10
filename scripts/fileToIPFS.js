require('dotenv').config();

const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const JWT = process.env.PINATA_JWT

const pinFileToIPFS = async (fileName, imgPath) => {
    const formData = new FormData();
    const src = imgPath;
    
    const file = fs.createReadStream(src)
    formData.append('file', file)
    
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
        "description": "OOP Project NFT 001",
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

const main = async () => {
    // console.log(JWT)
    res = await pinFileToIPFS('nyanCat', './nyanCat.png')
    imgIpfsHash = res.IpfsHash
    res = await pinJSONToIPFS(imgIpfsHash)
    metadataIpfsHash = res.IpfsHash
    

    // console.log(res)
}

main();


