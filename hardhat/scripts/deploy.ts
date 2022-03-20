import { deployContract } from "../utils/helpers"

async function main() {
  const baseURI = "https://nftstorage.link/ipfs/bafybeiai4z7rqc6ndrashxif5gjtsmumuyqorspkqv3ximxtpv3p6wsl7u/"
  const slicerAddress = "0x346b8D7fAcE9ffB43450d182D05Edb50981FcD39" // <-------- TODO add this
  const mosaicNftAddress = "0x346b8D7fAcE9ffB43450d182D05Edb50981FcD39" // <-------- TODO add this

  const mosaic = await deployContract("MosaicoBrasileiro", [
    baseURI,
    slicerAddress,
    mosaicNftAddress,
  ])

  console.log("MosaicoBrasileiro contract deployed to:", mosaic.address)

  console.log("All done, now run --> npx hardhat run scripts/init_ownership.ts")
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })

// Run with: npx hardhat run scripts/deploy.ts --network rinkeby
