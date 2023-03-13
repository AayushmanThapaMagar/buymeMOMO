<title>Fund My MOMO 🥟</title>
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