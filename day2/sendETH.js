import { formatEther } from "ethers";
import { getProvider, getSigner } from "./utils.js";

const mainnetProvider = getProvider(true);
const sepoliaProvider = getProvider();

const sepoliaSigner = getSigner();

// const myMainnetBalance = await mainnetProvider.getBalance(sepoliaSigner);
const mySepoliaBalance = await sepoliaProvider.getBalance(sepoliaSigner);

const sanfordAddress = await mainnetProvider.resolveName("sanfordstout.eth");

console.log("My Sepolia balance:", formatEther(mySepoliaBalance));
console.log("Sending ETH to:", sanfordAddress);

const tx = await sepoliaSigner.sendTransaction({
	to: sanfordAddress,
	value: mySepoliaBalance / 1000n,
});

console.log("TX sent!", tx.hash);

await tx.wait();

console.log("TX mined!");
