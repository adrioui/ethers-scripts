import { Contract, parseEther, formatEther } from "ethers";
import daiAbi from "./abi/daiAbi.js";
import { getSigner } from "./utils.js";

const testnetDaiAddress = "0x776b6fc2ed15d6bb5fc32e0c89de68683118c62a";
const sepoliaSigner = getSigner();

const daiContract = new Contract(testnetDaiAddress, daiAbi, sepoliaSigner);

const myAddress = "0x94A5D03FEe64dADE55Df989fE2Cb3AA74c06b7ec";
const daiBalance = await daiContract.balanceOf(myAddress);

console.log(`My DAI balance: ${daiBalance}`);

const daiTx = await daiContract.transfer(
	"0x6F706c14bba87f5b136d7A3D1B68A00d0b043a9B",
	parseEther("10"),
);

console.log("TX sent", daiTx.hash);

await daiTx.wait();

console.log("TX mined!");
