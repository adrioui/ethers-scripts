import {
	Wallet,
	Mnemonic,
	HDNodeWallet,
	JsonRpcProvider,
	AbstractSigner,
	formatEther,
	parseEther,
	verifyMessage,
} from "ethers";
import "dotenv/config";

// const wallet = Wallet.createRandom();
//
// console.log("address:", wallet.address);
// console.log("private key:", wallet.privateKey);
// console.log("mnemonic:", wallet.mnemonic.phrase);
//
// const mnemonic = Mnemonic.fromPhrase(wallet.mnemonic.phrase);
//
// // Derive ten wallets
// for (let i=0; i <10; i++) {
//   const path = `m/44'/60'/0'/0/${i}`;
//   const myWallet = HDNodeWallet.fromMnemonic(mnemonic, path);
//
//   console.log(`Wallet ${i}:`);
//   console.log("  Address:", myWallet.address);
//   console.log("  Private Key:", myWallet.privateKey);
//   console.log("  Path:", myWallet.path)
// }

const sepoliaUrl = `https://sepolia.infura.io/v3/${process.env.INFURA_KEY}`;
const sepoliaProvider = new JsonRpcProvider(sepoliaUrl);

const mainnetUrl = `https://mainnet.infura.io/v3/${process.env.INFURA_KEY}`;
const mainnetProvider = new JsonRpcProvider(mainnetUrl);

// You can assign the provider like this
// const signer = new Wallet(process.env.MY_WALLET_PRIVATE_KEY, provider);

// Or like this
const signer = new Wallet(process.env.MY_WALLET_PRIVATE_KEY);
const connectedSigner = signer.connect(sepoliaProvider);

// console.log(connectedSigner.provider !== null);

// const signature = await signer.signMessage("Hola!")
// // console.log("Signed message:", signature)
//
// const recoveredAddress = verifyMessage("Hola!", signature)
// console.log("Recovered address:", recoveredAddress)

// console.log(recoveredAddress === signer.address); // ✅ true

// console.log("Sepolia balance:", formatEther(await provider.getBalance(signer)));

// Get balance in wei (BigNumber)
const myBalance = await sepoliaProvider.getBalance(signer.address);

const sanfordAddress = await mainnetProvider.resolveName("sanfordstout.eth");
console.log(sanfordAddress);

// Send 1/100th of the balance
const trx = await connectedSigner.sendTransaction({
	to: sanfordAddress,
	value: myBalance / 10000n,
});
// const trx = await connectedSigner.sendTransaction({
//   to: "0xeaB893786C20A8Da17B385dc0e50B91BfC5825f2",
//   value: myBalance/ 1000n
// });

console.log("TX hash:", trx.hash);

await trx.wait();

console.log("TX CONFIRMED!");
