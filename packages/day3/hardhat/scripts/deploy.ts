import { ethers } from "hardhat";

async function main() {
	const Greeter = await ethers.getContractFactory("Greeter");
	const greeter = await Greeter.deploy("Hello, Sepolia!");

	await greeter.waitForDeployment(); // newer ethers v6 style
	console.log("Greeter deployed to:", await greeter.getAddress());
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
