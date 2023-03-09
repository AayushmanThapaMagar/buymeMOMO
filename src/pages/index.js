// import ethers
import {
  Textarea,
  Input,
  Button,
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  Stack,
  StackDivider,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  InputLeftAddon,
  InputGroup,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper
} from '@chakra-ui/react';

import{ethers} from 'ethers';
import {useEffect, useState} from 'react';
import {abi} from './abi_momo';
import { useRouter } from 'next/router';

export default function Home() {

  const {onClose} = useDisclosure();
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState('');
  const [ammount, setAmmount] = useState(1);
  const [message, setMessage] = useState('');
  const [hasMetamask, setHasMetamask] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const router = useRouter();
  const [isSuccessful, setIsSuccessful] = useState(false);

  useEffect(() => {
    if (typeof window.ethereum !== 'undefined') {
      setHasMetamask(true);
      checkConnection();
    }});


  async function connect() {
    if (hasMetamask) {
      await window.ethereum.request({ method: 'eth_requestAccounts'});
      checkConnection();
      }
    }

    async function checkConnection() {
      const accounts = await window.ethereum.request({ method: 'eth_accounts'});
      if (accounts.length) {
        setIsConnected(true);
      }
    }

  return (
    <>
    <title>Fund my MOMO 🥟</title>
      {
        hasMetamask ? (
          isConnected ? (
          ""
        ): (
          <div>
            <Modal 
            isOpen='true' 
            onClose={onClose}
            isCentered
            >
              <ModalOverlay />
              <ModalContent>
                <ModalHeader>
                  Connect Wallet
                </ModalHeader>
                <ModalBody>
                  Please connect MetaMask to continue.
                </ModalBody>
                <ModalFooter>
                  <Button colorScheme="teal" mr={3} onClick={() => connect()}>Connect</Button>
                </ModalFooter>
              </ModalContent>
            </Modal>
          </div>
        )) : (
          <div>
            <Alert status='error'>
              <AlertIcon />
              <AlertTitle>Metamask not detected!</AlertTitle>
              <AlertDescription>Please install the Metamask extension</AlertDescription>
            </Alert>
          </div>
        )
      }

      {isConnected ? (
        <>
        <Button onClick={() => router.push('/factory')}> Create a MOMO</Button>
        <Button onClick={() => router.push('/donate')}> Buy someone MOMO </Button>
        </>
      ) : ""}
    </>
  )
}
