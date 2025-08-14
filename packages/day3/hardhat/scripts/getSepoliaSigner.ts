import { ethers } from "hardhat";

async function main() {
	const [hardhatSigner] = await ethers.getSigners();
	const myBalance = await hardhatSigner.provider.getBalance(
		hardhatSigner.address,
	);

	console.log("My balance is:", ethers.formatEther(myBalance), "ETH");
}

// Run script with error handling
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
