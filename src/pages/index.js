import { useEffect } from 'react'
import NavBar  from './navbar'
import {metamaskInfo, connectionInfo} from './wallethandler'

export default function Home() {
  // const {hasMetamask}= metamaskInfo();
  // const {isConnected} = connectionInfo();

  // if (hasMetamask)  {
  //   console.log("has metamask");
  // } else {
  //   console.log("no metamask");
  // }

  return (
    <>
    <NavBar />
    </>
  )
}
