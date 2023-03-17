<>
<Alerts 
isSuccessful = {isSuccessful}
/>
  {
    hasMetamask ? (
      isConnected ? (
      ""
    ): (
      <div>
        "Connect Wallet"
      </div>
    )) : (
      <div>
        "No Metamask"
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
      </form>) : ""}
</>