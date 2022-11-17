import { Grid, Typography,Button, Card , List,ListItem,TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CardContent, CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useState } from 'react'
import Layout from '../Componets/Layout'
import Store from '../utils/store'
import NextLink from 'next/link'
import useStyles from '../utils/styles';
import Image from 'next/image';
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import StepsWizard from '../Componets/StepsWizard';
import { useSnackbar } from 'notistack';
import { getError } from '../utils/error';
import axios from 'axios'
import Cookies from 'js-cookie';

 function placeOrder() {
    const router = useRouter();
    const {state,dispatch} = useContext(Store);
    const classes = useStyles()
    const {userInfo,cart:{cartItems,shippingAddress,paymentMethod}} = state;
    const round2 =(num)=> Math.round(num * 100)/100;
    const itemsPrice = round2(cartItems.reduce((a,c)=> a + c.price * c.quantity,0))
    const shippingPrice = itemsPrice > 200 ? 0 :15;
    let infoContent = itemsPrice > 200 ? <p className={classes.blinkText} style={{color:'green'}}>No shipping charges for order above $200</p> : 
                        <p className={classes.blinkText} style={{color:'red'}}>shipping charges applied for order below $200</p>
    console.log(infoContent);
    const taxPrice = round2(itemsPrice * 0.15)
    const TotalPrice = round2(itemsPrice + shippingPrice + taxPrice)
    const {closeSnackbar,enqueueSnackbar} = useSnackbar();
    const [loading,setLoading] = useState(false);

    // const token = `${userInfo.token}`
    // console.log(token);

    useEffect(()=>{
        if (!paymentMethod) {
            router.push('/payment')
        }
        if (cartItems.length === 0) {
            router.push('/cart')
        }
    },[])

    const placeOrderHandler = async()=>{
        // console.log(userInfo);
        closeSnackbar();
        try {
            setLoading(true)
            const data = await axios.post(`/api/order`,{
                orderItems: cartItems,
                shippingAddress,
                paymentMethod,
                itemsPrice,
                shippingPrice,
                taxPrice,
                TotalPrice
            }, 
            { 
                headers: {
                    authorization: "Bearer " + `${userInfo.data.token}`
                  }
            }
           
            );
            dispatch({type:'CLEAR_CART'})
            Cookies.remove('cartItems')
            setLoading(false)
            alert(userInfo.data._id)
            router.push(`/order/${userInfo.data._id}`)
        } 
        catch (error) {
            enqueueSnackbar(getError(error),{variant:'error'})
            setLoading(false)
        }
      
    }

  return (
    <Layout title="Place Order">
        <StepsWizard activeStep={3}></StepsWizard>
        <Typography  variant="h5" className={classes.marginTopBtm} style={{textTransform:'uppercase'}}>place-Order</Typography>
      
            
                <Grid container spacing={1}>
                    <Grid item md={9} xs={12}>
                        <Card variant='outlined'  style={{margin:'0 20px 20px 0px'}}>
                            <CardContent>
                                <Typography variant='h6' className={classes.marginTopBtm} style={{textTransform:'uppercase'}}> shipping-Address</Typography>
                                <Typography variant='subtitle1'>
                                    {shippingAddress.fullName}<br/>{shippingAddress.address}<br/>{shippingAddress.city}<br/>
                                    {shippingAddress.postalCode}<br/>{shippingAddress.country}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card variant='outlined'  style={{margin:'0 20px 20px 0px'}}>
                            <CardContent>
                                <Typography variant='h6' className={classes.marginTopBtm} style={{textTransform:'uppercase'}}> Payment-Method</Typography>
                                <Typography variant='subtitle1'>
                                    {paymentMethod}
                                </Typography>
                            </CardContent>
                        </Card>
                        <Card variant='outlined' style={{marginRight:'20px'}}>
                            <CardContent>
                                <Typography variant='h6' className={classes.marginTopBtm} style={{textTransform:'uppercase'}}>Orderd-Items</Typography>
                                <TableContainer >
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell >Quantity</TableCell>
                                        <TableCell >Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {cartItems.map((item) => (
                                        <TableRow key={item._id}>
                                            <TableCell>
                                                <NextLink href={`/product/${item.slug}`}>
                                                    <a>
                                                        <Image src={item.image} alt={item.name} width={80} height={80}></Image>
                                                    </a>
                                                </NextLink>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>{item.name}</Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>
                                                <Typography>{item.quantity}</Typography>
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>${item.price}</Typography>
                                            </TableCell>
                                           

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                            </CardContent>
                        </Card>
                     
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card>
                            <List>
                                <ListItem><Typography variant='h6'>Order Summary</Typography></ListItem>
                                <ListItem>
                                        <Grid container>
                                            <Grid item xs={6}>
                                                <Typography variant='subtitle1' className={classes.upperCase}>Price :</Typography>
                                            </Grid>
                                            <Grid item xs={6} >
                                                <Typography variant='subtitle1' className={classes.upperCase}><b>{'$' + itemsPrice}</b></Typography>
                                            </Grid>
                                        </Grid>
                                </ListItem>
                               
                                <ListItem><Typography variant='subtitle1' className={classes.upperCase}>Shipping-Price :<b>{'$' + shippingPrice}</b></Typography></ListItem>
                                <ListItem>{infoContent}</ListItem>
                                <ListItem><Typography variant='subtitle1' className={classes.upperCase}>Tax-Price :  <b>{'$' + taxPrice}</b></Typography></ListItem>
                                <ListItem><Typography variant='subtitle1' className={classes.upperCase}><b>Total-Price</b> :  <b>{'$' + TotalPrice}</b></Typography></ListItem>
                                <ListItem> <Button variant='contained' color='primary' fullWidth  onClick={placeOrderHandler}>place Order</Button></ListItem>
                            </List>
                        </Card>
                    </Grid>
                    {loading && <ListItem><CircularProgress></CircularProgress></ListItem>}
                </Grid>
            

        
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(placeOrder),{ssr:false} )
