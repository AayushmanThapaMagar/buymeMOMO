import NavBar  from '../components/navbar'
import {useEffect, useState} from 'react';

export default function Home() {

  const [hasMetamask, setHasMetamask] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {{
    checkMetamask();
    checkConnection();
    }});


  async function checkMetamask() {
    if (typeof(window.ethereum) !== 'undefined') {
      setHasMetamask(true);
    }
  }

  async function checkConnection() {

    try {
      const accounts = await window.ethereum.request({ method: 'eth_accounts'});
      if (accounts.length) {
        setIsConnected(true);
      }
    } catch (err) {
      console.log(err)
    }
  }

  async function connect() {
    if (hasMetamask) {
      await window.ethereum.request({ method: 'eth_requestAccounts'});
      checkConnection();
      }
    }

  return (
    <>
      <NavBar 
      hasMetamask={hasMetamask}
      setHasMetamask = {setHasMetamask}
      isConnected={isConnected}
      setIsConnected = {setIsConnected}
      clickFunction = {connect}
      />
      
    </>
  )
}
