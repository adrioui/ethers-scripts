import type { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "dotenv/config";

const config: HardhatUserConfig = {
	solidity: "0.8.28",
	networks: {
		sepolia: {
			url: `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`,
			accounts: [process.env.MY_WALLET_PRIVATE_KEY],
		},
	},
};

export default config;
