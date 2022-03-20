// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "./ERC721A_M.sol";
import "./meltable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/token/ERC721/IERC721Receiver.sol";
import "@openzeppelin/contracts/interfaces/IERC721.sol";

/////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                 //
//    ooo        ooooo   .oooooo.    .oooooo..o       .o.       ooooo   .oooooo.     .oooooo.      //
//    `88.       .888'  d8P'  `Y8b  d8P'    `Y8      .888.      `888'  d8P'  `Y8b   d8P'  `Y8b     //
//     888b     d'888  888      888 Y88bo.          .8"888.      888  888          888      888    //
//     8 Y88. .P  888  888      888  `"Y8888o.     .8' `888.     888  888          888      888    //
//     8  `888'   888  888      888      `"Y88b   .88ooo8888.    888  888          888      888    //
//     8    Y     888  `88b    d88' oo     .d8P  .8'     `888.   888  `88b    ooo  `88b    d88'    //
//    o8o        o888o  `Y8bood8P'  8""88888P'  o88o     o8888o o888o  `Y8bood8P'   `Y8bood8P'     //
//                                                                                                 //
/////////////////////////////////////////////////////////////////////////////////////////////////////

contract MosaicoBrasileiro is ERC721A_M, IERC721Receiver, Ownable, Meltable {
  
  /// ================================
  /// ============ Errors ============
  /// ================================
  
  error NonexistentToken();
  error AlreadyMinted();
  error WrongNFT();
  error NotMosaicOwner();
  error NotOwnerOfAll();
  error NotAuthorized();

  /// =================================
  /// ============ Storage ============
  /// =================================

  address private immutable mosaicNftAddress;
  address private immutable slicerAddress;
  string private baseURI;

  /// =====================================
  /// ============ Constructor ============
  /// =====================================

  constructor(
    string memory baseURI_,
    address slicerAddress_,
    address mosaicNftAddress_
  ) ERC721A_M("MosaicoBrasileiro2022", "MOSAICO") {
    baseURI = baseURI_;
    slicerAddress = slicerAddress_;
    mosaicNftAddress = mosaicNftAddress_;
  }

  /// ===================================
  /// ============ Functions ============
  /// ===================================

  /**
   * @notice Mints the 16 NFTs to an address.
   *
   * @dev Can only be called if the NFTs haven't been minted yet
   */
  function mint(address to) private {
    if (totalSupply() != 0) revert AlreadyMinted();

    _safeMint(to, 16);
  }

  /**
   * @notice Burns the 16 NFTs and sends the mosaic NFT to the msg.sender.
   *
   * @dev Can only be called if the msg.sender owns all the 16 NFTs and this address owns the mosaic NFT.
   */
  function melt() external {
    if (balanceOf(msg.sender) != 16) revert NotOwnerOfAll();

    _burnAll();

    IERC721(mosaicNftAddress).safeTransferFrom(address(this), msg.sender, 1);

    _currentIndex = 1;
  }

  /**
   * @notice Safeguard function to mint the entire collection to an address who transferred
   * the mosaic NFT using `transferFrom`, instead of `safeTransferFrom` or `claimToMint`
   *
   * @dev Can only be by contract owner
   */
  function emergencyMint(address previousOwner) external onlyOwner {
    if (IERC721(mosaicNftAddress).balanceOf(address(this)) == 0)
      revert NotMosaicOwner();

    mint(previousOwner);
  }

  /**
   * @notice Mints 16 NFTs to the sender, in exchange for storing the mosaic NFT.
   *
   * @dev NFT owner needs to have approved this contract address as operator for the mosaic contract.
   * @dev One of the two ways to claim the entire collection, the other one being calling safeTransferFrom.
   */
  function sendAndMint() external {
    if (IERC721(mosaicNftAddress).balanceOf(msg.sender) == 0)
      revert NotMosaicOwner();

    IERC721(mosaicNftAddress).safeTransferFrom(msg.sender, address(this), 1);
  }

  /**
   * @dev Base URI for computing {tokenURI}. If set, the resulting URI for each
   * token will be the concatenation of the `baseURI` and the `tokenId`.
   */
  function _baseURI() internal view override returns (string memory) {
    return baseURI;
  }

  /**
   * @notice ERC-2981 implementation
   *
   * @dev Returns how much royalty is owed and to whom, based on a sale price that may be denominated in any unit of
   * exchange. The royalty amount is denominated and should be payed in that same unit of exchange.
   */
  function royaltyInfo(uint256 tokenId, uint256 salePrice)
    external
    view
    returns (address receiver, uint256 royaltyAmount)
  {
    if (!_exists(tokenId)) revert NonexistentToken();
    return (slicerAddress, salePrice / 10);
  }

  /**
   * @notice Mints 16 nfts to the sender of the mosaic NFT.
   *
   * @dev See {IERC721Receiver-onERC721Received}.
   *
   * Always returns `IERC721Receiver.onERC721Received.selector`.
   */
  function onERC721Received(
    address,
    address from,
    uint256 tokenId,
    bytes memory
  ) external virtual override returns (bytes4) {
    if (msg.sender != mosaicNftAddress) revert WrongNFT();
    if (tokenId != 1) revert WrongNFT();

    mint(from);

    return this.onERC721Received.selector;
  }
}
