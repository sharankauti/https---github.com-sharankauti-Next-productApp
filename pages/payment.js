import { Box, Button, FormControl, FormControlLabel, FormLabel, Radio, RadioGroup,Typography } from "@material-ui/core";
import Cookies from "js-cookie";
import { Router, useRouter } from "next/router";
import React,{useContext, useEffect, useState} from "react";
import Layout from "../Componets/Layout";
import StepsWizard from "../Componets/StepsWizard";
import Store from "../utils/store";
import useStyles from "../utils/styles";
import { useSnackbar } from "notistack";


const Payment = () => {
    const {state,dispatch} = useContext(Store)
    const {userInfo,cart:{shippingAddress}} = state;
    const [payment,setPayment] = useState("")
    const classes = useStyles()
    const router = useRouter()
    const {enqueueSnackbar,closeSnackbar} = useSnackbar();
    useEffect(()=>{
        if (!shippingAddress.address) {
            router.push('/shipping')
        }
        else{
            setPayment(Cookies.get('paymentMethod') || '')
        }
    },[])
    const handleChange = (event) => {
        setPayment(event.target.value);
      };
    const submitPaymentHandler = (event)=>{
        closeSnackbar()
       
        event.preventDefault();
        if (!payment) {
            enqueueSnackbar('Payment Method is Required', {variant:'error'})
        } 
        else{
          
            dispatch({type:'SAVE_PAYMENT_METHOD',payload:payment})
            Cookies.set('paymentMethod',payment)
            router.push('/placeOrder')
        }
    }
    return (
        <>
            <Layout title='paymentPage'>
                <StepsWizard activeStep={2}></StepsWizard>
                <form onSubmit={submitPaymentHandler} className={classes.form}>
                    <FormControl component="fieldset">
                        <FormLabel><Typography variant="h6" className={classes.marginTopBtm} style={{textTransform:'uppercase'}}>Select payment method:</Typography></FormLabel>
                            <RadioGroup aria-label="Select Payment Method:" name="payment" value={payment} onChange={handleChange}>
                                <FormControlLabel value="PayPal" control={<Radio></Radio>} label="paypal"></FormControlLabel>
                                <FormControlLabel value="Stripe" control={<Radio></Radio>} label="Stripe"></FormControlLabel>
                                <FormControlLabel value="Cash" control={<Radio></Radio>} label="Cash"></FormControlLabel>
                            </RadioGroup>
                            <div style={{width:'100%'}}>
                                <Box display="flex" flexDirection="row"  bgcolor="transparent">
                                    <Box bgcolor="transparent" mr={4}>
                                        <Button color="primary" className={classes.marginTopBtm} onClick={() => router.push('/shipping')} >Back</Button>
                                    </Box>
                                    <Box bgcolor="transparent">
                                        <Button className={classes.marginTopBtm} variant='contained' color='primary' type="submit">Continue</Button>
                                    </Box>
                                </Box>
                            </div>
                            
                            
                    </FormControl>
                </form>
            </Layout>
            
        </>
    )
}

export default Payment;