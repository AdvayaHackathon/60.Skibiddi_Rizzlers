// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract TravelStampNFT is ERC721URIStorage, Ownable {
    uint256 public tokenCount;

constructor(address initialOwner) ERC721("TravelStampNFT", "TSNFT") Ownable(initialOwner) {}

    function mintStamp(address to, string memory tokenURI) public onlyOwner returns (uint256) {
        tokenCount++;
        uint256 tokenId = tokenCount;
        _mint(to, tokenId);
        _setTokenURI(tokenId, tokenURI);
        return tokenId;
    }
}
