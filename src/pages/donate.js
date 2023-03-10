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
    NumberDecrementStepper,
    CloseButton
  } from '@chakra-ui/react';
  
  import{ethers} from 'ethers';
  import {useEffect, useState} from 'react';
  import {abi} from './abi_momo';
  import { useRouter } from 'next/router';
  
  export default function momo() {



    const {onClose} = useDisclosure();
    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [ammount, setAmmount] = useState(1);
    const [message, setMessage] = useState('');
    const [hasMetamask, setHasMetamask] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const [isOwner, setIsOwner] = useState(false);
    const router = useRouter();
    const [isSuccessful, setIsSuccessful] = useState('');
  
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

      async function checkOwner() {
        if (isConnected) {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const address = '0xD51Bf6225B1f84c57f3A4F5FA73d86D5E5385837';
          const contract = new ethers.Contract(address, abi, signer);
          const owner = await contract.owner();
          const signerAddress = await signer.getAddress();
          if (owner === signerAddress) {
            setIsOwner(true);
          }
        }
      }
      async function donate() {
        setIsLoading(true);
        const _abi = abi;
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const address = '0xD51Bf6225B1f84c57f3A4F5FA73d86D5E5385837';
        const contract = new ethers.Contract(address, _abi, signer);

        try {
          const tx = await contract.donate(name, message, {value: ethers.utils.parseEther(ammount.toString())});
          await tx.wait();
          setIsSuccessful('true');
          setIsLoading(false);
          // contract address 
        } catch (error) {
          setIsSuccessful('false');
          setIsLoading(false);
        }
        // await tx.wait();
        // setIsSuccessful(true);
        // setIsLoading(false);
        // // contract address 
      }
    return (
      <>
      <title>Fund my MOMO ????</title>
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
  
        {isConnected ? (<form onSubmit = {() => donate()}style = {{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100vh'
            }}>
              <Card>
                <CardHeader>
                  <Heading size='md' style={{textAlign: 'center'}}>Buy Me MOMO ????</Heading>
                </CardHeader>
                <CardBody>
                  <Stack divider={<StackDivider />} spacing='4'>
                    <Box>
                      <InputGroup>
                        <InputLeftAddon children='From' />
                        <Input 
                        value = {name} 
                        onChange={(e) => setName(e.target.value)} 
                        placeholder="Anonymous" />
                      </InputGroup>
                    </Box>
                    <Box>
                      <NumberInput 
                      default={1}
                      min={1} 
                      onChange={setAmmount}
                      >
                        <NumberInputField placeholder='G??rli'/>
                          <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                      </NumberInput>
                    </Box>
                    <Box>
                      <Textarea 
                      value = {message}
                      onChange={(e) => setMessage(e.target.value)}
                      resize='None' 
                      placeholder="Message" />
                    </Box>  
                    <Box align='center'>
                      <Button
                      isLoading = {isLoading}
                      colorScheme="teal" 
                      variant="outline" 
                      onClick={()=>donate()}>
                        LETS GO!
                        </Button>
                        
                    </Box>
                  </Stack>
                </CardBody>
              </Card>
              <>
                {
                  (isSuccessful === '') ? (
                    ""
                  ) : (
                    isSuccessful === 'true' ? (
                      <Alert status='success'>
                        <AlertIcon />
                        <AlertTitle>Transaction Successful!</AlertTitle>
                        <AlertDescription>Thank you for your donation!</AlertDescription>
                        {/* <CloseButton
                        alignSelf='flex-start'
                        position='relative'
                        right={-1}
                        top={-1}
                        onClose={onClose}
                        /> */}
                      </Alert>
                    ) : (
                      <Alert status='error'
                      position='fixed'
                      top='0'>
                        <AlertIcon />
                        <AlertTitle>Transaction Failed!</AlertTitle>
                        <AlertDescription>Something went wrong, please try again.</AlertDescription>
                        {/* <CloseButton
                        alignSelf='flex-start'
                        position='relative'
                        right={-1}
                        top={-1}
                        onClose={onClose}
                        /> */}
                      </Alert>
                    )
                  )
                }
              </>
            </form>) : ""}
      </>
    )
  }
  