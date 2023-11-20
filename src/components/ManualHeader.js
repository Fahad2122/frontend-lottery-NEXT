import { useEffect } from "react";
import { useMoralis } from "react-moralis";

export default function ManualHeader() {

    const { enableWeb3, account, isWeb3Enabled, isWeb3EnableLoading, Moralis, deactivateWeb3 } = useMoralis();

    useEffect(() => {
        if(!isWeb3Enabled && typeof window !== "undefined" && window.localStorage.getItem("connected")){
            enableWeb3();
        }
    }, [isWeb3Enabled])

    useEffect(() => {
        Moralis.onAccountChanged((newAccount) => {
            if(newAccount == null){
                window.localStorage.removeItem("connected");
                deactivateWeb3()
            }
        })
    }, [])

  return (
    <div>
        {account ? (<div>Connected to {account.slice(0,5)}...{account.slice(account.length-4)}</div>) : (<button onClick={async () => {
            const ret = await enableWeb3()
            if(typeof ret !== "undefined"){
                if(typeof window !== "undefined"){
                    window.localStorage.setItem("connected", "injected")
                }
            }
        }} disabled={isWeb3EnableLoading} >Connect</button>)}
        
    </div>
  )
}