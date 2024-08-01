import { CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import {FormContainer, TextFieldElement} from 'react-hook-form-mui'
import * as React from 'react';
import Box from '@mui/material/Box';
import { green, teal } from '@mui/material/colors';
import { Container } from '@mui/material';
import { Button, Stack } from '@mui/material';
import { useWatch} from 'react-hook-form'
import AppNavBar from '../AppNavBar';



const currentTheme = createTheme({
    palette: {
        primary: green,
        secondary: teal,
    }
});


function SubComponent() {
    const [
        name, 
        symbol,
        amount,
        description,
        purchaseTime,
        api
    ] = useWatch({
      name: 'name',
      symbol: "symbol",
      amount: "amount",
      description: "description",
      purchaseTime: "purchaseTime",
      api: "api"
    })
    return (
      <Button type={'submit'} color={'primary'} disabled={!(name && symbol)}>
        Submit
      </Button>
    )
  }

function addStockDataToBackend(data) {
    console.log(data);
    // Send the POST request using fetch
    fetch("http://129.114.27.23:1314/investments/stocks", {
        method: "POST",
        headers: {
        "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
        .then((response) => response.json())
        .then((data) => console.log("Success:", data))
        .catch((error) => console.error("Error:", error));

}  

function Form() {
    return (
        <FormContainer defaultValues={{
            name: ''
          }} onSuccess={(data) => {addStockDataToBackend(data)}}>
              <Stack spacing={2}>
                <TextFieldElement name={'name'} label={'Name'} required />
                <TextFieldElement name={'symbol'} label={'Symbol'} required />{' '}
                <TextFieldElement name={'amount'} label={'Amount'} required />
                <TextFieldElement name={'description'} label={'Description'} />
                <TextFieldElement name={'purchaseTime'} label={'PurchaseTime'} required />
                <TextFieldElement name={'api'} label={'API'} />
                <SubComponent />
              </Stack>
            </FormContainer>
        
    )
}
export default function AddStockForm() {
    
    return (
        <ThemeProvider theme = {currentTheme}>
            <Box dx = {{ display: "flex" }}>
                <CssBaseline />
                <AppNavBar />
                <Box>
                    <Container maxWidth="lg" sx={{ mt: 10, mb: 8}}>
                        <Form />
                    </Container>
                </Box>
                

            </Box>
        </ThemeProvider>

    )
}