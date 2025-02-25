import { ethers } from "hardhat";

async function main() {
    const TokenTransfer = await ethers.getContractFactory("TokenTransfer");
    const tokenTransfer = await TokenTransfer.deploy();
    await tokenTransfer.waitForDeployment();

    console.log("TokenTransfer deployed to:", await tokenTransfer.getAddress());
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});
