import { expect } from "chai";
import { ethers } from "hardhat";

describe("Counter", function () {
	let counter;
	let signer0;
	let signer1;

	beforeEach(async () => {
		[signer0, signer1] = await ethers.getSigners();
		console.log("deploying contract as:", signer0.address);

		const CounterFactory = await ethers.getContractFactory("Counter");
		counter = await CounterFactory.deploy(10);
		await counter.waitForDeployment();
	});

	it("should return the initial counter", async () => {
		const counting = await counter.get();
		expect(counting).to.equal(10);
	});

	it("should increment the counter by 1", async () => {
		const tx = await counter.inc();
		await tx.wait();

		const newCounting = await counter.get();
		expect(newCounting).to.equal(11);
	});

	it("should return the boss as signer0", async () => {
		expect(await counter.boss()).to.equal(signer0.address);
	});

	it("should accept the decrement because you're the boss", async () => {
		const decTx = await counter.dec();
		await decTx.wait();

		expect(await counter.get()).to.equal(9);
	});

	it("should accept the super increment because you're the boss", async () => {
		const superIncTx = await counter.connect(signer1).superInc();
		await superIncTx.wait();

		expect(await counter.get()).to.equal(20);
	});
});
