import { expect } from "chai";
import { ethers } from "hardhat";

describe("Greeter", function () {
	let greeter;

	beforeEach(async () => {
		const GreeterFactory = await ethers.getContractFactory("Greeter");
		greeter = await GreeterFactory.deploy("Hello, world!");
		await greeter.waitForDeployment();
	});

	it("should return the initial greeting", async () => {
		const greeting = await greeter.greet();
		expect(greeting).to.equal("Hello, world!");
	});

	it("should revert when trying to setGreeting while locked", async () => {
		await expect(greeter.setGreeting("New Greeting")).to.be.revertedWith(
			"Sorry, this it locked!",
		);
	});

	it("should update the greeting when it's unlocked", async () => {
		const unlockTx = await greeter.toggleUnlocked();
		await unlockTx.wait();

		const tx = await greeter.setGreeting("Hola, mundo!");
		await tx.wait();

		const newGreeting = await greeter.greet();
		expect(newGreeting).to.equal("Hola, mundo!");
	});
});
