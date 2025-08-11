import { ethers } from "hardhat";
import { formatEther } from "ethers";

async function main() {
	// Connect to local node (Hardhat, Geth, or Lighthouse)
	const localUrl = "http://127.0.0.1:8545";
	const provider = new ethers.JsonRpcProvider(localUrl);

	const [hardhatSigner] = await ethers.getSigners();

	const myBalance = await provider.getBalance(hardhatSigner.address);
	console.log("My balance is:", formatEther(myBalance), "ETH");

	const tx = await hardhatSigner.sendTransaction({
		to: "0x90F79bf6EB2c4f870365E785982E1f101E93b906",
		value: myBalance / 100n,
	});

	console.log("TX sent!", tx.hash);

	await tx.wait();

	console.log("TX mined!");
}

// Run script with error handling
main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
