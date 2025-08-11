import { Contract, formatEther } from "ethers";
import sanfordNFTAbi from "./abi/sanfordNFTAbi.js";
import { getProvider } from "./utils.js";

const sanfordNFTAddress = "0x2a0f1c1ce263202f629bf41fa7caa3d5f8fd52c4";
const sepoliaProvider = getProvider();

const sanfordContract = new Contract(
	sanfordNFTAddress,
	sanfordNFTAbi,
	sepoliaProvider,
);

const balance = await sanfordContract.balanceOf(
	"0x2a0f1C1cE263202f629bF41FA7Caa3D5F8FD52C4",
);
console.log(`NFT Balance: ${balance}`);
