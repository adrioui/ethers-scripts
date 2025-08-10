import { Contract, formatEther } from "ethers";
import daiAbi from "./abi/daiAbi.js";
import { getProvider } from "./utils.js";

const daiAddress = "0x776b6fc2ed15d6bb5fc32e0c89de68683118c62a";
const sepoliaProvider = getProvider();

const daiContract = new Contract(daiAddress, daiAbi, sepoliaProvider);

const myAddress = "0x94A5D03FEe64dADE55Df989fE2Cb3AA74c06b7ec";
const daiBalance = await daiContract.balanceOf(myAddress);

console.log(`My DAI balance: ${daiBalance}`);
