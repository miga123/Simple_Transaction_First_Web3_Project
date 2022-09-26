
import { ethers } from "./ethers-5.6.esm.min.js";
import { abi, contractAddress } from "./constants.js";

const connectButton = document.getElementById("connectButton");
const fundButton = document.getElementById("fundButton");
const withdrawButton = document.getElementById("withdrawBtn");
const balanceButton = document.getElementById("balanceButton");
connectButton.onclick = connect;
fundButton.onclick = fund;
withdrawButton.onclick = withdraw;
balanceButton.onclick = getBalance;


async function connect() {
    if (typeof window.ethereum !== "undefined") {
        try {
            await window.ethereum.request({ method: "eth_requestAccounts" });
            console.log("Connected");
            connectButton.innerHTML = "Connected!";
        } catch (error) {
            console.log(error);
        }
    } else {
        connectButton.innerHTML = "please install metamask";
    }
}



async function fund() {
    const ethAmount = document.getElementById("ethAmount").value;
    console.log("funding with ${ethAmount}...");
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = new ethers.Contract(contractAddress, abi, signer);
        try {
            const transactionResponse = await contract.fallback({
                value: ethers.utils.parseEther(ethAmount)
            })
            await listenForTransactionMine(transactionResponse, provider)
        } catch (error) {
            console.log(error)
        }
    } else {
        fundButton.innerHTML = "Please install MetaMask"
    }
}

async function getBalance() {
    if (typeof window.ethereum !== "undefined") {
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        try {
            const balance = await provider.getBalance(contractAddress);
            document.getElementById("balanceLb").innerHTML = "balance is " + ethers.utils.formatEther(balance) + " ETH";
            console.log(ethers.utils.formatEther(balance));

        } catch (error) {
            console.log(error)
        }
    } else {
        balanceButton.innerHTML = "Please install MetaMask"
    }
}



async function withdraw() {

    if (typeof window.ethereum !== "undefined") {
        let ethAmount = document.getElementById("withdraInput").value; //"2.500000000"
        console.log("withdrawing with ${ethAmount}");

        console.log("Clicked" + ethAmount);

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        console.log(signer);
        const contract = new ethers.Contract(contractAddress, abi, signer);

        try {
            const transactionResponse = await contract.withdraw(
                ethers.utils.parseEther(ethAmount)
            );
            console.log(ethers.utils.formatEther(balance));
        } catch (error) {
            console.log(error);
        }

    } else {
        withdrawButton.innerHTML = "Please install MetaMask"
    }

}

function listenForTransactionMine(transactionResponse, provider) {
    console.log("Mining ${transactionResponse.hash}...");
    //listen for this transaction to finish
    return new Promise((resolve, reject) => {
        provider.once(transactionResponse.hash, (transactionReceipt) => {
            console.log(
                "Completed with ${transactionReceipt.confirmations} confirmations"
            )
            resolve()
        });
    });



}