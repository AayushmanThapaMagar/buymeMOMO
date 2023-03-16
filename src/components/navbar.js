import {
    Box,
    Button,
    IconButton,
    Image
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
            <div
            stlye = {{
                marginLeft: 'auto',
                marginRight: 'auto',
            }}
            >
                <IconButton
                icon={<Image src="https://cdn-icons-png.flaticon.com/512/3800/3800461.png" alt="logo" boxSize="50px" />}
                variant = 'ghost'
                onClick={() => router.push('/')}
                >
                    Home
                </IconButton>
            </div>

            <div
                style = {{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}
            >
                <div
                style={{
                  paddingRight: '25px',
                }}
                >
                    <Button
                    onClick={() => router.push('/donate')}
                    >
                        Donate
                    </Button>
                    <Button
                    onClick={() => router.push('/create')}
                    >
                        Create
                    </Button>
                </div>
                <div>
                {hasMetamask ? (
                    isConnected ? ( // has metamask and is connected
                    <Button 
                    colorScheme="teal"
                    ml = 'auto'
                    isActive = 'false'
                    >
                        Wallet Connected
                    </Button>
                    ) : ( // has metamask and not connected
                    <Button 
                    colorScheme="teal"
                    onClick={() => connect()}>Connect Wallet
                    </Button>
                    )
                    ) : (""// no metamask
                    )}
                </div>
            </div>
        </Box>
      </div>
    )
  }
  