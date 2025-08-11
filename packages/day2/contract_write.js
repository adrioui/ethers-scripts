import { Contract, parseEther } from "ethers";
import hopTokenAbi from "./abi/hopTokenAbi.js";
import { getSigner } from "./utils.js";

const hopTokenAddress = "0xad2fb788cbE73DE2b6A36B80E1DBd4bF40Fc059d";
const sepoliaSigner = getSigner();

const hopTokenContract = new Contract(
	hopTokenAddress,
	hopTokenAbi,
	sepoliaSigner,
);

const mintPrice = await hopTokenContract.mintPrice();
console.log("Hop token mint price:", mintPrice);

console.log("Minting NFT...");

const mintTx = await hopTokenContract.mint(
	"0x6F706c14bba87f5b136d7A3D1B68A00d0b043a9B",
	{ value: parseEther("0.001") },
);

console.log("TX sent", mintTx.hash);

mintTx.wait();
