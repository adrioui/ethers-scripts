import "dotenv/config";
import { JsonRpcProvider, formatEther, parseEther } from "ethers";

const infuraUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const provider = new JsonRpcProvider(infuraUrl);

// console.log("Current block number: ", await provider.getBlockNumber());

// Get address from ENS
// console.log("atg.eth is:", await provider.resolveName("atg.eth"));

// Get ENS from address
// console.log("this address is:", await provider.lookupAddress("0x34aA3F359A9D614239015126635CE7732c18fDF3"));

// Get someone balance in wei
// console.log("vitalik.eth has:", (await provider.getBalance("vitalik.eth")).toString());
const vitalikBalance = await provider.getBalance("vitalik.eth");
const sanfordBalance = await provider.getBalance("sanfordstout.eth");
// sanfordBalance = sanfordBalance + formatEther("5000")
//
// if (vitalikBalance > sanfordBalance) {
//   console.log("Vitalik has more balance than Sanford")
// } else {
//   console.log("Sanford has more balance than Vitalik")
// }

// Parsing to human readable format from someone's balance in wei
// console.log("vitalik.eth has:", formatEther(vitalikBalance));

// Get current wei from ETH
// console.log("1.5 ETH is:", parseEther("1.5", "wei"))
