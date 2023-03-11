import { Button } from '@chakra-ui/react';
import {ethers} from 'ethers';
import {useEffect, useState} from 'react';
import {abi} from "./abi_factory";

export default function Home() {

    const [hasMetamask, setHasMetamask] = useState(false);
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        checkWallet();
        checkConnection();
    });

        
    async function getConnection() {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = '0xE2f5D4D5B02254bcd6262CEAacee93B23D7fDba7';
        const contract = new ethers.Contract(address, abi, signer);
        return(contract);
    }

    async function checkWallet() {
        if (typeof window.ethereum !== 'undefined') {
            setHasMetamask(true);
        }
    }
    async function checkConnection(){
        const accounts = await window.ethereum.request({ method: 'eth_accounts'});
        if (accounts.length) {
            setIsConnected(true);
        }
    }


    async function create() {
        const contract = await getConnection();
        const account = await window.ethereum.request({ method: 'eth_accounts'});

        try {
            const tx = await contract.createContract();
            const receipt = await tx.wait();
            console.log(receipt);
            try {
                const addr = await contract.deployedContracts(account);
                console.log(addr);

            } catch (error) {
                console.log(error);
            }
        } catch (error) {
            console.log(error);
        }
    }

    
return (
    <>
    <Button
    onClick={() => create()}
    >
        Create Contract
    </Button>
    </>
    )
} 
