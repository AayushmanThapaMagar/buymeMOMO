import {
    Box,
    useDisclosure,
    Button,
  } from '@chakra-ui/react';
  
  import {useEffect, useState} from 'react';
  import { useRouter } from 'next/router';
  
  export default function NavBar() {
  
    const [hasMetamask, setHasMetamask] = useState(false);
    const [isConnected, setIsConnected] = useState(false);
    const router = useRouter();
  
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
      const accounts = await window.ethereum.request({ method: 'eth_accounts'});
      if (accounts.length) {
        setIsConnected(true);
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
      <div>
        <Box
        bg = "gray.100"
        p="5" 
        shadow="md"
        borderWidth="1px"
        borderRadius="md"
        style = {{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        >
          <Button
          variant={'link'}
          colorScheme="teal"
          style = {{
            float: "right",
          }}
          onClick={() => router.push('/donate')}
          >
            Donate
            </Button>
            <Button
            variant={'link'}
            colorScheme="teal"
            size = 'lg'
            spacing = '20 rem'
            onClick={() => router.push('./factory')}
            >
              Deploy
            </Button>
          {hasMetamask ? (
            isConnected ? ( // has metamask and is connected
              <Button 
              colorScheme="teal"
              ml = 'auto'
              isDisabled = {true}
              >
                Wallet Connected
              </Button>
            ) : ( // has metamask and not connected
              <Button 
              colorScheme="teal"
              ml = 'auto'
              onClick={() => connect()}>Connect Wallet
              </Button>
            )
          ) : (""
          // no metamask
          )}
        </Box>
      </div>
      </>
    )
  }
  