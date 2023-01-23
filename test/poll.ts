import { time, loadFixture } from "@nomicfoundation/hardhat-network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import { ethers } from "hardhat";


describe ("Polling", () => {
    async function deployLoadFixture(){
        const [owner, signer1, signer2, signer3, signer4] = await ethers.getSigners();

        //Deploying Polling contract
        const Polling = await ethers.getContractFactory("Polling");
        const poll = await Polling.deploy();

        return {owner, signer1, signer2, signer3,signer4, poll }
    }

    describe("CreateVote", () => {
        it("Should create vote for a vote owner successfully", async function (){
            const { signer1, poll} = await loadFixture(deployLoadFixture);
            
            await poll.connect(signer1).createVote("President", 7, "https://source.unsplash.com/mkTqZN1NzhY/640x960", "Obi Peters or Tinubu or Atiku");
            await expect( poll.connect(signer1).createVote("President", 7, "https://source.unsplash.com/mkTqZN1NzhY/640x960", "Obi Peters or Tinubu or Atiku"));
        })
    })

    describe("Vote", () => {

        it("Should vote successfully", async function(){
            const {owner, signer2, poll} = await loadFixture(deployLoadFixture);

            await poll.connect(owner).createVote("President", 20, "https://source.unsplash.com/mkTqZN1NzhY/640x960", "Obi Peters or Tinubu or Atiku");
            await poll.connect(signer2).Vote(1, 1);
            await expect( poll.connect(signer2).Vote(1, 1)).to.be.revertedWith("already voted");
        });
        it("Should revert if rating is not valid", async function(){
        
            const {signer1, signer3, poll} = await loadFixture(deployLoadFixture);

            await poll.connect(signer1).createVote("Manager", 45, "https://source.unsplash.com/mkTqZN1NzhY/640x960", "Obi Peters or Tinubu or Atiku");
            //await poll.connect(signer3).Vote(1, 0);
            await expect(poll.connect(signer3).Vote(1, 2)).to.be.revertedWith("invalid Rating")
        });

        it("Should revert if duration for vote has exceeded", async function(){
            const {signer1, signer4, poll} = await loadFixture(deployLoadFixture);

            await poll.connect(signer1).createVote("Manager", 12, "https://source.unsplash.com/mkTqZN1NzhY/640x960", "Obi Peters or Tinubu or Atiku");
           // await poll.connect(signer3).Vote(1, 3);
            await expect(poll.connect(signer4).Vote(1, 2)).to.be.revertedWith("Voting has ended")
        })
    })
})