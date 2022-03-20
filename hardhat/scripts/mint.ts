import { ethers } from "hardhat"
import { MosaicoBrasileiro } from "../typechain-types/MosaicoBrasileiro"
import dotenv from "dotenv"
dotenv.config()

async function main() {
  const mosaico = (await ethers.getContractAt(
    "MosaicoBrasileiro",
    String(process.env.NFT_CONTRACT_ADDRESS)
  )) as MosaicoBrasileiro

  console.log(mosaico)

  const result = await mosaico.ment(
    "0xb49323D62c00E2948942C0662cc83914e6Ed69F7"
  )

  console.log(result)
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  