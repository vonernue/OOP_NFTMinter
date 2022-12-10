require('dotenv').config();

const axios = require('axios')
const FormData = require('form-data')
const fs = require('fs')
const { NFTStorage } = require('nft.storage')
const API_KEY = process.env.NFTSTORAGE_KEY;

async function getExampleImage() {
  const imageOriginUrl = "./nyanCat.png"
  const r = await fetch(imageOriginUrl)
  if (!r.ok) {
    throw new Error(`error fetching image: [${r.statusCode}]: ${r.status}`)
  }
  return r.blob()
}

async function storeNFTInfo(blob) {
  const image = blob
  const nft = {
    image, // use image Blob as `image` field
    name: "Test NFT",
    description: "The metaverse is here. Where is it all being stored?",
  }

  const client = new NFTStorage({ token: API_KEY })
  const metadata = await client.store(nft)

  console.log('NFT data stored!')
  console.log('Metadata URI: ', metadata.url)
}

exports.storeNFTInfo = storeNFTInfo;