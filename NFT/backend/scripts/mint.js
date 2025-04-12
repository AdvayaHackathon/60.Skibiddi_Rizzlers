const hre = require("hardhat");

async function main() {
  const [deployer] = await hre.ethers.getSigners();

  const contractAddress = "0x59b670e9fA9D0A427751Af201D676719a970857b";
  const LocationStamp = await hre.ethers.getContractFactory("TravelStampNFT");
  const stamp = await LocationStamp.attach(contractAddress);

  const userAddress = "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199";
  const location = "gw";

  const tokenURI = "ipfs://bafybeift7dxtcxiwbv345e57osjvi32i3ml2lwu4im3bvrkwdukyxpcqnu/gw.json";

  console.log(`⛏️ Minting NFT for location: ${location}...`);
  const tx = await stamp.mintStamp(userAddress, tokenURI);
  await tx.wait();
  console.log("✅ Minted NFT for:", location);

  const tokenId = await stamp.tokenCount();
  const fetchedURI = await stamp.tokenURI(tokenId);
  const owner = await stamp.ownerOf(tokenId);

  console.log("🔎 Token ID:", tokenId.toString());
  console.log("🔗 Token URI:", fetchedURI);
  console.log("👤 Owner:", owner);
}

main().catch((error) => {
  console.error("❌ Error minting:", error);
  process.exitCode = 1;
});
