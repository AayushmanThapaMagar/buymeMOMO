import {ethers} from 'ethers';
import {useEffect, useState} from 'react';

export default function Home() {

    const [hasMetamask, setHasMetamask] = useState(false);

    useEffect(() => {
        if (typeof window.ethereum !== 'undefined') {
          setHasMetamask(true);
          checkConnection();
        }});

        
    async function checkConnection() {
        const accounts = await window.ethereum.request({ method: 'eth_accounts'});
        if (accounts.length) {
            setIsConnected(true);
        }
    }

    
return (
    <>
    <h1>Test</h1>
    </>
    )
} 
