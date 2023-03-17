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
    InputLeftAddon,
    InputGroup,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
  } from '@chakra-ui/react';
  
  import{ethers} from 'ethers';
  import {useEffect, useState} from 'react';
  import {abi} from '../abi/abi_momo';
  import {Alerts} from '@/components/alerts';
  
  export default function Momo({hasMetamask, setHasMetamask, isConnected, setIsConnected}) {


    const [isLoading, setIsLoading] = useState(false);
    const [name, setName] = useState('');
    const [ammount, setAmmount] = useState(1);
    const [message, setMessage] = useState('');
    const [isSuccessful, setIsSuccessful] = useState('');

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
        } catch (error) {
          setIsSuccessful('false');
          setIsLoading(false);
        }
      }
    return (
      <>
      <title> Donate MOMO</title>
      <div
      style = {{
        display: 'flex',
        justifyContent: 'center',
        height: '75vh',
        alignItems: 'center'
        
      }}>
        <Card>
          <CardHeader>
            <Heading size='md' style={{textAlign: 'center'}}>Buy Me MOMO 🥟</Heading>
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
                  <NumberInputField placeholder='Görli'/>
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
              <Box 
              align='center'>
                {hasMetamask ? (
                  isConnected ? (
                  <Button
                    isLoading = {isLoading}
                    colorScheme="teal" 
                    variant="outline"
                    onClick={()=>donate()}>
                      LETS GO!
                  </Button>
                   ) : (
                    <Button
                    colorScheme="teal"
                    variant="outline"
                    isDisabled= {true}
                    >
                      Lets GO!
                    </Button>
                   )
                ) : (
                  <Button
                  colorScheme="teal"
                  variant="outline"
                  isDisabled= {true}
                  >
                    Lets GO!
                  </Button>
                ) }
              </Box>
            </Stack>
          </CardBody>
        </Card>
      </div>
      </>
    )
  }
  