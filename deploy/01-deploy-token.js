const { network } = require("hardhat");
const { INITIAL_SUPPLY, developmentChains } = require("../helper-hardhat-config");
const { verify } = require("../utils/verify");


module.exports = async function({getNamedAccounts, deployments}){
    const {deployer} = await getNamedAccounts();
    const {deploy, log} = deployments;
    const chainId = network.config.chainId;

    const contractArgs = [INITIAL_SUPPLY];
    const ourToken = await deploy("OurToken",{
        from: deployer,
        args: contractArgs,
        log: true,
        waitConfirmations: network.config.blockConfirmations || 1
    })
    log(`OurToken deployed at ${ourToken.address}`);

    if(!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY){
        await verify(ourToken.address, contractArgs);
    }
}

module.exports.tags = ['all', 'token'];