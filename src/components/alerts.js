
import { Alert, AlertIcon, AlertTitle, AlertDescription } from "@chakra-ui/react"

export function Alerts(
    { isSuccessful }
) {
    return (
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
                </Alert>
            ) : (
                <Alert status='error'
                position='fixed'
                top='0'>
                <AlertIcon />
                <AlertTitle>Transaction Failed!</AlertTitle>
                <AlertDescription>Something went wrong, please try again.</AlertDescription>
                </Alert>
            )
            )
        }
        </>
    )
}