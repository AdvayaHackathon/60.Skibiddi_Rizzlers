// scripts/deploy.js
const hre = require("hardhat");

async function main() {
const [deployer] = await ethers.getSigners();

console.log("Deploying contract with address:", deployer.address);

  
  const TravelStampNFT = await hre.ethers.getContractFactory("TravelStampNFT");
  const contract = await TravelStampNFT.deploy(deployer.address);
  await contract.deployed();

  console.log("TravelStampNFT deployed to:", contract.address);
}


main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
