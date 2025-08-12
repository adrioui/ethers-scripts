import { ethers } from "hardhat";

async function main() {
  const contractAddress = "0x5fbdb2315678afecb367f032d93f642f64180aa3"

  const Greeter = await ethers.getContractFactory("Greeter");
  const greeter = Greeter.attach(contractAddress)

  console.log("Initial greeting is:", await greeter.greet())

  console.log("Updating greeting...")
  const tx = await greeter.setGreeting("Hello from write action!")
  await tx.wait()

  const newGreeting = await greeter.greet();
  console.log("New greeting is:", newGreeting)
}

main().catch((error) => {
	console.error(error);
	process.exitCode = 1;
});
