import {useState} from 'react';

export const metamaskInfo = () => {

  const [hasMetamask, setHasMetamask] = useState(false);

    if (typeof(window.ethereum) !== 'undefined') {
      setHasMetamask(true);
    }

    return {hasMetamask, setHasMetamask};
}

export const connectionInfo = () => {
    const [isConnected, setIsConnected] = useState(false);
        const accounts = window.ethereum.request({ method: 'eth_accounts'});
        
        if (accounts.length) {
          setIsConnected(true);
        }

    return {isConnected, setIsConnected};
}