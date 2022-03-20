# Mosaico Brasileiro

## Problem Statement
Everyday more creators come into the web3 space, looking to make a positive impact with their work. But in addition to general onboarding challenges, there is an unmet need around collaborative art projects that share royalties between multiple creators.

## Solution Approach

A community-owned, mixed-reality NFT exhibit during ETH Rio 2022

Our hackathon project, Mosaico Brasileiro, is part product development, part community development:
> - We built a new NFT mechanic to improve collaboration and a VR gallery to showcase the art
> - We curated 16 Brazilian artists for an NFT auction and helped onboard over half to web3
> - We launched a DAO to raise funds for the auction and give all funds to the artists, four Brazilian foundations, and ETH Rio builders

**Who’s it for?** 🎨 Brazilian artists and 🏖 Rio community, 🖼 art collectors, 💻 web3 enthusiasts<br />
**What’s it for?** 🙌 Come together, 🎭 create art, 🌱 take care of our world

### 🎨 Quick hits

1) We curated pieces from 16 Brazilian creators for an immersive mixed reality NFT exhibit
    - _including Felipe Guga, painter of the murals at Fabria de Startup =)_
3) We built a new NFT mechanic — 🔥 melting — to allow a group of artists to auction their work as one collectible and share royalties
4) We built a metaverse gallery to showcase the artwork in an immersive VR environment
5) This weekend, we are auctioning the selected works during ETH Rio 2022 conference
6) We launched a DAO with the purpose to raise 5–10 ETH and win the auction of the Mosaico Brasileiro collection
7) This afternoon, we are hosting a VR Q&A session with people interested in the DAO, livestreamed out of the metaverse with Livepeer
8) We onboarded over half of the 16 Brazilian artists to web3, helping them setup their Metamask wallets
9) We collaborated with four Brazilian foundations to further social and ecological causes with proceeds from the auction (royalties defined with the EIP2981 spec)
10) We deployed a 🍰 slicer smart contract with Slice.so so all primary and secondary sales go to the artists, Brazilian charitable foundations, and conference attendees

### 🙌 Community ownership
- 70% to the Brazilian artists
- 20% to the charitable foundations
  - Impacto (who will further share with numerous foundations) — 
  - A Rocinha resiste — 
  - Prototipando a quebrada — 
  - Refauna — 
- 10% to the conference attendees, including many of the hackathon builders and social projects that presented

### 🔥 Meltable mechanic
- If an NFT is "meltable", it can be converted from a single, collaborative NFT into a collection of individual NFTs and vice verse
- In our project, there is 1 NFT contract that represents all 16 pieces in a single NFT (https://foundation.app/@neodaoist/mosaic/1)
- And there is 1 NFT contract we wrote, that has 16 individual NFTs for each of the pieces (https://github.com/neodaoist/mosaic/blob/main/hardhat/contracts/mosaic.sol)
- If the auction is won, the owner can "melt" the single NFT into the 16 individual NFTs, by sending it to the custom contract NFT (see the onERC721Received() callback, this is the only way to call mint() function)
- Likewise, if all 16 melted NFTs are owned by the same account, they can "melt" the NFTs back into the single NFT by calling the melt() function
- We think this can be a powerful evolution of the burn mechanic and helps support collaborative NFT projects like Mosaico Brasileiro

### 📅 Key dates

- Call for Works — open 4 March to 13 March
- Curation and Onboarding — 14 March to 17 March
- Building, Gallery, and Auction — the full moon 18 March to the last day of summer 20 March 11:59 pm Rio time

## 🌎 Exhibit links
- Smart contracts
  - [Main NFT contract](https://github.com/neodaoist/mosaic/blob/main/hardhat/contracts/mosaic.sol) — custom Solidity code 
  - ["Meltable" NFT contract](https://foundation.app/@neodaoist/mosaic/1) — deployed with Foundation
  - [Slicer NFT](https://slice.so/slicer/8) — deployed with Slice.so
- Frontend
  - [Mozilla Hubs metaverse gallery](https://hubs.mozilla.com/b3tJJ7s/mosaico) — built with Mozilla Spoke world-builder
  - [Foundation Auction](https://foundation.app/@neodaoist/mosaic/1)
  - [Juicebox DAO treasury](https://juicebox.money/#/p/mosaic) - configured with juicebox.money

## tl;dr
Mosaico Brasileiro is all about helping artists collaborate and coordinate to use their art for good in the world, with a powerful new web3 primitive for builders and a compelling metaverse experience for collectors 🚀🚀
