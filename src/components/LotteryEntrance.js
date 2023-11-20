// components/LotteryEntrance.js
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { useNotification } from "web3uikit";
import { ethers } from "ethers";
import { contractAddresses, abi } from "@/constants";

export default function LotteryEntrance() {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();

  const chainId = parseInt(chainIdHex);

  const lotteryAddress = chainId in contractAddresses ? contractAddresses[chainId][0] : null;

  const [entranceFee, setEntranceFee] = useState("");
  const [numPlayers, setNumPlayers] = useState("");
  const [recentWinner, setRecentWinner] = useState("");

  const dispatch = useNotification();

  const {
    runContractFunction: enterLottery,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "enterLottery",
    msgValue: entranceFee,
    params: {},
  });

  const { runContractFunction: getEntranceFee } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getEntranceFee",
    params: {}
})

const { runContractFunction: getNumberOfPlayers } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getNumberOfPlayers",
    params: {}
})

const { runContractFunction: getRecentWinner } = useWeb3Contract({
    abi: abi,
    contractAddress: lotteryAddress,
    functionName: "getRecentWinner",
    params: {}
})

async function updateUIValues() {
    const _entranceFee = (await getEntranceFee()).toString()
    const _recentWinner = (await getRecentWinner()).toString()
    const _numberPlayers = (await getNumberOfPlayers()).toString()

    setEntranceFee(_entranceFee)
    setNumPlayers(_numberPlayers)
    setRecentWinner(_recentWinner)
}

useEffect(() => {
    if(isWeb3Enabled){
        updateUIValues();
    }
}, [isWeb3Enabled])

const handleNewNotification = () => {
    dispatch({
        type: "info",
        message: "Transaction Complete!",
        title: "Transaction Notification",
        position: "topR",
        icon: "bell"
    })
}

const handleSuccess = async (tx) => {
    try {
        await tx.wait(1)
        updateUIValues()
        handleNewNotification(tx)
    } catch (error) {
        console.log(error)
    }
}


  return (
    <div className="bg-gray-100 p-4 rounded-md shadow-md">
      <h2 className="text-2xl font-bold mb-4">Lottery</h2>
      {lotteryAddress ? (
        <>
          <button
  onClick={async () => {
    await enterLottery({
      onSuccess: handleSuccess,
      onError: (error) => {
        console.log(error);
        console.log(lotteryAddress);
      },
    });
  }}
  disabled={isLoading || isFetching}
  className={`bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:shadow-outline-blue active:bg-blue-800 ${
    isLoading || isFetching ? 'relative' : ''
  }`}
>
  {isLoading || isFetching ? (
    <>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="spinner-border text-white" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
      <span className="opacity-0">Enter Lottery</span>
    </>
  ) : (
    'Enter Lottery'
  )}
</button>

          <div className="mt-4">Entrance Fee: {entranceFee / 1e18}</div>
          <div>The current number of Players: {numPlayers}</div>
          <div>The most recent Winner: {recentWinner}</div>
        </>
      ) : (
        <div className="text-red-500">Please connect to a supported chain</div>
      )}
    </div>
  );
}
