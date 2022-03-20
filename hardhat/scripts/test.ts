import { ethers } from "hardhat"
import { MosaicoBrasileiro } from "../typechain-types/MosaicoBrasileiro"

async function main() {
  const mosaico = (await ethers.getContractAt(
    "MosaicoBrasileiro",
    String(process.env.NFT_CONTRACT_ADDRESS)
  )) as MosaicoBrasileiro

  const result = await mosaico.tokenURI(1)

  console.log(result)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })