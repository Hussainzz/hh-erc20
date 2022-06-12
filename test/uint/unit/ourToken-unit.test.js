const { assert, expect } = require("chai");
const { getNamedAccounts, deployments, ethers } = require("hardhat");
const { INITIAL_SUPPLY } = require("../../../helper-hardhat-config");


describe("OurToken Unit Test", function () {

    let ourToken, deployer, someUser;
    beforeEach(async function () {
        deployer = (await getNamedAccounts()).deployer;
        someUser = (await getNamedAccounts()).someUser;
        await deployments.fixture("all");

        ourToken = await ethers.getContract("OurToken", deployer);
    });

   
    it("Initializes the token correctly", async function () {
        const totalSupply = await ourToken.totalSupply();
        assert.equal(totalSupply.toString(), INITIAL_SUPPLY);
    }); 

    it("Mints all token to the deployer on deployment", async function () {
        const balanceOf = await ourToken.balanceOf(deployer);
        assert.equal(balanceOf.toString(), INITIAL_SUPPLY);
    });

    it("Allows to transfer tokens successfully to an address", async function () {
        const transferTxn = await ourToken.transfer(someUser,"2");
        const balanceOfSomeUser = await ourToken.balanceOf(someUser);
        expect(transferTxn).to.emit("Transfer");
        assert.equal(balanceOfSomeUser.toString(), "2");
    });

    it("Mints all token to the deployer on deployment", async function () {
        const balanceOf = await ourToken.balanceOf(deployer);
        assert.equal(balanceOf.toString(), INITIAL_SUPPLY);
    });
    
});