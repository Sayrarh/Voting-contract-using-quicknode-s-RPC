import { ethers } from "hardhat";

async function main() {
  
  const Polling = await ethers.getContractFactory("Polling");
  const polling = await Polling.deploy();

  await polling.deployed();

  console.log(`Polling contract is deployed to ${polling.address}`);
  //Polling contract is deployed to 0xd9373dca2A95Df1512e4e3C4d07018fD2C3e6415
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
