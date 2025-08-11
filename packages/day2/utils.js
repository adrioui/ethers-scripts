import { JsonRpcProvider, Wallet } from "ethers";
import "dotenv/config";

const getProvider = (mainnet = false) => {
	const providerUrl = mainnet
		? `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`
		: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`;

	return new JsonRpcProvider(providerUrl);
};

const generateNewWallet = () => {
	const wallet = Wallet.createRandom();

	console.log("Address:", wallet.address);
	console.log("Private key:", wallet.privateKey);
	console.log("mnemonic:", wallet.mnemonic.phrase);
};

const getSigner = (mainnet = false) => {
	const provider = getProvider(mainnet);
	const signer = new Wallet(process.env.MY_WALLET_PRIVATE_KEY, provider);

	return signer;
};

export { getProvider, generateNewWallet, getSigner };
