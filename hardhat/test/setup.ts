import { ethers } from "hardhat"
import { Signer } from "ethers"
import { MosaicoBrasileiro } from "../typechain-types/MosaicoBrasileiro"
import { ERC721Test } from "../typechain-types/ERC721Test"
import { deployContract } from "../utils/helpers"

export let addr0: Signer,
  addr1: Signer,
  addr2: Signer,
  addr3: Signer,
  addr4: Signer,
  addr5: Signer,
  addr6: Signer,
  addr7: Signer,
  a0: string,
  a1: string,
  a2: string,
  a3: string,
  a4: string,
  a5: string,
  a6: string,
  a7: string,
  mosaico: MosaicoBrasileiro,
  nft: ERC721Test

before(async () => {
  const [
    address0,
    address1,
    address2,
    address3,
    address4,
    address5,
    address6,
    address7,
  ] = await ethers.getSigners()

  a0 = address0.address
  a1 = address1.address
  a2 = address2.address
  a3 = address3.address
  a4 = address4.address
  a5 = address5.address
  a6 = address6.address
  a7 = address7.address
  addr0 = address0
  addr1 = address1
  addr2 = address2
  addr3 = address3
  addr4 = address4
  addr5 = address5
  addr6 = address6
  addr7 = address7

  nft = (await deployContract("ERC721Test")) as ERC721Test

  const baseURI = "https://nftstorage.link/ipfs/Qmasd/"
  const slicerAddress = a3
  const mosaicNftAddress = nft.address

  // Deploy empty contracts to get addresses to be hardcoded
  mosaico = (await deployContract("MosaicoBrasileiro", [
    baseURI,
    slicerAddress,
    mosaicNftAddress,
  ])) as MosaicoBrasileiro
})
