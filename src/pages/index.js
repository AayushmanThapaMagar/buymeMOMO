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
  ModalCloseButton
} from '@chakra-ui/react';
import {useEffect, useState} from 'react';

export default function Home() {

  const {isOpen, onOpen, onClose} = useDisclosure();
  const [hasMetamask, setHasMetamask] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [signer, setSigner] = useState(undefined);

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
    async function donate() {
      console.log("Success!")
    }
  return (
    <>
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

      {isConnected ? (<div style = {{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}>
            <Card>
              <CardHeader>
                <Heading size='md' style={{textAlign: 'center'}}>Buy Me MOMO 🥟</Heading>
              </CardHeader>
              <CardBody>
                <Stack divider={<StackDivider />} spacing='4'>
                  <Box>
                    <Input placeholder="From" />
                  </Box>
                  <Box>
                    <Input placeholder="Ammount" />
                  </Box>
                  <Box>
                    <Textarea resize='None' placeholder="Message" />
                  </Box>
                  <Box align='center'>
                    <Button colorScheme="teal" variant="outline" onClick={() => donate()}>LEST GO!</Button>
                  </Box>
                </Stack>
              </CardBody>
            </Card>
          </div>) : ""}
    </>
  )
}
