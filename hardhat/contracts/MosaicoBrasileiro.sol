// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MosaicoBrasileiro is
        ERC721,
        ERC721URIStorage,
        Ownable
    {

    // Add EIP2981 and RoyaltyRegistry.xyz
    // Add metadata attributes
    // Add image hash

    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    uint256 private mosaicRows = 4;
    uint256 private mosaicColumns = 4;
    uint256 private mosaicArea = mosaicRows * mosaicColumns;

    constructor() ERC721("MosaicoBrasileiro2022", "MOSAICO") {}

    function safeMint(address to, string memory uri) public onlyOwner {
        uint256 tokenId = _tokenIdCounter.current();
        _tokenIdCounter.increment();
        _safeMint(to, tokenId);
        _setTokenURI(tokenId, uri);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
