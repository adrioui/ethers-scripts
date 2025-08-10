import { Interface, Contract, parseEther } from "ethers";
import hopTokenAbi from "./abi/hopTokenAbi.js";
import { getSigner } from "./utils.js";

const hopTokenAddress = "0xad2fb788cbE73DE2b6A36B80E1DBd4bF40Fc059d";
const sepoliaSigner = getSigner();

const hopTokenContract = new Contract(
	hopTokenAddress,
	hopTokenAbi,
	sepoliaSigner,
);

const mintPrice = parseEther("0.001");

// Use ethers to encode the calldata
const iface = new Interface(hopTokenAbi);
const toAddress = await sepoliaSigner.getAddress();

const mintCalldata = iface.encodeFunctionData("0x6a627842", [toAddress]);

console.log("Minting NFT...");

const mintTx = await sepoliaSigner.sendTransaction({
	to: hopTokenAddress,
	value: mintPrice,
	data: mintCalldata,
	nonce: 10,
	gasPrice: 10000000000,
});

// const mintTx = await sepoliaSigner.sendTransaction({
// 	to: hopTokenAddress,
// 	value: mintPrice,
// 	data: mintCalldata,
// 	nonce: 10,
// 	gasPrice: 1000,
// });

console.log("TX sent", mintTx.hash);

mintTx.wait();

console.log("TX mined!");
