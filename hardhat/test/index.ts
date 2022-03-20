import { expect } from "chai"
import { a0, a1, addr1, mosaico, nft } from "./setup"

describe("{MosaicoBrasileiro}", () => {
  it("Automatic mint on NFT safeTransfer", async () => {
    await nft["safeTransferFrom(address,address,uint256)"](
      a0,
      mosaico.address,
      1
    )
    expect(await nft.balanceOf(a0)).to.be.equal(0)
    expect(await nft.balanceOf(mosaico.address)).to.be.equal(1)
    expect(await mosaico.totalSupply()).to.be.equal(16)
    expect(await mosaico.balanceOf(a0)).to.be.equal(16)
    expect(await mosaico.ownerOf(1)).to.be.equal(a0)
    expect(await mosaico.ownerOf(16)).to.be.equal(a0)
  })

  it("Cannot call melt if msg.sender doesn't own all the 16 NFTs", async () => {
    expect(await mosaico.ownerOf(1)).to.be.equal(a0)
    await mosaico["safeTransferFrom(address,address,uint256)"](a0, a1, 1)

    expect(mosaico.melt()).to.be.reverted
    expect(await mosaico.ownerOf(1)).to.be.equal(a1)

    await mosaico
      .connect(addr1)
      ["safeTransferFrom(address,address,uint256)"](a1, a0, 1)

    expect(await mosaico.ownerOf(1)).to.be.equal(a0)
  })

  it("Melt NFTs correctly", async () => {
    await mosaico.melt()
    expect(await mosaico.totalSupply()).to.be.equal(0)
    expect(await mosaico.balanceOf(a0)).to.be.equal(0)
    expect(await nft.balanceOf(a0)).to.be.equal(1)
    expect(await nft.balanceOf(mosaico.address)).to.be.equal(0)
  })

  it("Cannot call sendAndMint if msg.sender doesn't own the origin NFT", async () => {
    await nft["safeTransferFrom(address,address,uint256)"](a0, a1, 1)

    expect(mosaico.sendAndMint()).to.be.reverted

    await nft
      .connect(addr1)
      ["safeTransferFrom(address,address,uint256)"](a1, a0, 1)
  })

  it("Mint NFTs using sendAndMint", async () => {
    await nft.approve(mosaico.address, 1)
    await mosaico.sendAndMint()

    expect(await mosaico.totalSupply()).to.be.equal(16)
    expect(await mosaico.balanceOf(a0)).to.be.equal(16)
    expect(await mosaico.ownerOf(1)).to.be.equal(a0)
    expect(await mosaico.ownerOf(16)).to.be.equal(a0)
    await mosaico.melt()
  })

  it("Emergency mint work", async () => {
    await nft.transferFrom(a0, mosaico.address, 1)
    expect(await mosaico.totalSupply()).to.be.equal(0)
    expect(await mosaico.balanceOf(a0)).to.be.equal(0)
    expect(await nft.balanceOf(mosaico.address)).to.be.equal(1)

    await mosaico.emergencyMint(a1)

    expect(await mosaico.totalSupply()).to.be.equal(16)
    expect(await mosaico.balanceOf(a1)).to.be.equal(16)
    expect(await mosaico.ownerOf(1)).to.be.equal(a1)
    expect(await mosaico.ownerOf(16)).to.be.equal(a1)
  })
})
