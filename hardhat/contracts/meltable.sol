// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

/**
 * @dev Required interface of a meltable compliant contract.
 */
interface Meltable {

  /**
   * @notice Burns the individual NFTs and sends the mosaic NFT to the msg.sender.
   *
   * @dev Can only be called if the msg.sender owns all the NFTs and this address owns the mosaic NFT.
   */
    function melt() external;
}
