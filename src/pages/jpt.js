<card>
        <CardHeader>
          <Heading size ='md'>BuyMe MOMO 🥟</Heading>
        </CardHeader>
        <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh" }}>
          <form>
            <h1 style= {{textAlign: "center"}}></h1>
            <br />
            <Input placeholder="From" />
            <br />
            <Input placeholder="Ammount" />
            <br />
            <Input Textarea="Message" />
            <div style={{ textAlign: "right", width: "100%" }}>
              <Button colorScheme="teal" variant="outline" onClick={() => donate()}>LEST GO!</Button>
            </div>
          </form>
        </div>
        <CardBody>

        </CardBody>
      </card>