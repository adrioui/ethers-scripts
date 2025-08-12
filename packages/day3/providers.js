import "dotenv/config";
import { JsonRpcProvider, formatEther, parseEther } from "ethers";

const localUrl = `http://localhost:8545`;
const localProvider = new JsonRpcProvider(localUrl);
console.log(
	"Current block number on Local Node:",
	await localProvider.getBlockNumber(),
);

const myBalance = await localProvider.getBalance(
	"0x94A5D03FEe64dADE55Df989fE2Cb3AA74c06b7ec",
);
console.log(myBalance);
// const sanfordBalance = await localProvider.getBalance("sanfordstout.eth");
