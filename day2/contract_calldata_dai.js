import { Interface, Contract, parseEther, formatEther } from "ethers";
import daiAbi from "./abi/daiAbi.js";
import { getSigner } from "./utils.js";

const daiAddress = "0x776b6fc2ed15d6bb5fc32e0c89de68683118c62a";
const sepoliaSigner = getSigner();

const daiContract = new Contract(daiAddress, daiAbi, sepoliaSigner);

// Use ethers to encode the calldata
const iface = new Interface(daiAbi);
const toAddress = "0x6F706c14bba87f5b136d7A3D1B68A00d0b043a9B";
const daiBalance = await daiContract.balanceOf(toAddress);
const amount = parseEther("0.00001");

const daiCalldata = iface.encodeFunctionData("0xa9059cbb", [toAddress, amount]);

console.log("Transfering some DAI...");

const daiTx = await sepoliaSigner.sendTransaction({
	to: daiAddress,
	value: 0,
	data: daiCalldata,
	// nonce: 10,
	// gasPrice: 10000000000,
});

console.log("TX sent", daiTx.hash);

await daiTx.wait();

console.log("TX mined!");
