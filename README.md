# NFT Minter Project
This project aimed to create a webpage that can mint nft using your webcam to your wallet.

This project also included a face detector that can detect a face's gender and age. 

Face detector used in this project.
https://github.com/smahesh29/Gender-and-Age-Detection

## Prerequisite
* Alchemy - https://www.alchemy.com/
* Pinata Cloud - https://www.pinata.cloud/
* A ethereum wallet
* NodeJS
* Python
## Instructions

### Construct Environment Variables
```
API_URL = Alchemy API URL
API_KEY = Alchemy API KEY
PRIVATE_KEY = Wallet's Private Key
PINATA_KEY = Pinata Key
PINATA_SECRET = Pinata Secret
PINATA_JWT = Pinata JWT
CONTRACT_ADDR = Smart Contract Address
```
### Deploy Smart Contract
1. Provide your Alchemy API credentials in `.env`
1. Run `npm install` to install necessary packages
1. Run `npx hardhat run scripts/deploy.js --network goerli`
1. Your should see your contract address after deployment

### Start the server
1. Provide necessary credentials in `.env`
1. Run `sudo openssl req -x509 -nodes -days 365 -newkey rsa:2048 -keyout ./selfsigned.key -out selfsigned.crt`
1. Put the output certificate and keys into `certs` folder
1. Run `npm run dev`
1. The server should be listening on `5000`