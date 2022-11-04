import { ethers } from "hardhat";

async function main() {
    const contractAddress = "0xd9373dca2A95Df1512e4e3C4d07018fD2C3e6415"
    const contractInter = await ethers.getContractAt("Polling", contractAddress);
    
    const createVote = await contractInter.createVote("President", 7, "https://source.unsplash.com/mkTqZN1NzhY/640x960", "Obi Peters or Tinubu or Atiku");
    console.log("Create your vote" ,createVote);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
