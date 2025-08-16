import { expect } from "chai";
import { ethers } from "hardhat";

describe("SanfordToken", () => {
	let sanfordToken;

	beforeEach(async () => {
		const SanfordTokenFactory = await ethers.getContractFactory("SanfordToken");
		sanfordToken = await SanfordTokenFactory.deploy();
		await sanfordToken.waitForDeployment();
	});

	it("should be able to create tokens", async () => {
		const [signer0] = await ethers.getSigners();

		const createTx = await sanfordToken.create(100);
		await createTx.wait();

		expect(await sanfordToken.balances(signer0.address)).to.equal(100);
	});

	it("should be reverted if it reaches the totalSupply", async () => {
		const totalSupply = await sanfordToken.totalSupply();

		const createTx = sanfordToken.create(totalSupply + 100n);

		await expect(createTx).to.be.reverted;
	});

	it("should be able to create tokens if they're a boss", async () => {
		const [signer0, signer1] = await ethers.getSigners();

		const createTx = sanfordToken.connect(signer1).create(1);

		await expect(createTx).to.be.reverted;
	});

	it("should be able to send tokens", async () => {
		const [signer0, signer1] = await ethers.getSigners();

		const createTx = await sanfordToken.connect(signer0).create(100);
		await createTx.wait();
		expect(await sanfordToken.balances(signer0.address)).to.equal(100);

		const sendTx = await sanfordToken.send(signer1.address, 25);
		await sendTx.wait();

		expect(await sanfordToken.balances(signer0.address)).to.equal(75);
		expect(await sanfordToken.balances(signer1.address)).to.equal(25);
	});

	it("should allow a rando to buy some tokens", async () => {
		const [signer0, signer1] = await ethers.getSigners();

		const buyTx = await sanfordToken
			.connect(signer1)
			.buy({ value: await ethers.parseEther("0.01") });
		await buyTx.wait();

		expect(await sanfordToken.balances(signer1.address)).to.equal(1);
	});

	it("should emit Buy event when someone buys", async () => {
		const [signer0, signer1] = await ethers.getSigners();
		await expect(
			sanfordToken.connect(signer1).buy({ value: ethers.parseEther("0.01") }),
		)
			.to.emit(sanfordToken, "Buy")
			.withArgs(signer1.address);
	});
});
