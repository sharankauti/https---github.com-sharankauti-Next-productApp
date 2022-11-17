import { Grid, Typography,Button, Card , List,ListItem,TableContainer, Table, TableHead, TableRow, TableCell, TableBody, CardContent, CircularProgress } from '@material-ui/core';
import React, { useContext, useEffect, useReducer,  } from 'react'
import Layout from '../../Componets/Layout'
import Store from '../../utils/store'
import NextLink from 'next/link'
import useStyles from '../../utils/styles';
import Image from 'next/image';
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'
import StepsWizard from '../../Componets/StepsWizard';
import { useSnackbar } from 'notistack';
import { getError } from '../../utils/error';
import axios from 'axios'

function reducer(state, action) {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true, error: '' };
      case 'FETCH_SUCCESS':
        return { ...state, loading: false, order: action.payload, error: '' };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        state;
    }
  }

 function Order({params}) {
    const orderId = params.id;
    const router = useRouter();
    const {state} = useContext(Store);
    const classes = useStyles()
    const {userInfo} = state;

    const [{ loading, error, order }, dispatch] = useReducer(reducer, {
        loading: true,
        order: {},
        error: '',
      });

    const {
        shippingAddress,
        paymentMethod,
        orderItems,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        isPaid,
        paidAt,
        isDelivered,
        deliveredAt,
      } = order;
      
      
    useEffect(()=>{
        if (!userInfo) {
           return router.push('/login')
        }

    
      
        const fetchOrder = async () => {
            try {
              dispatch({ type: 'FETCH_REQUEST' });
             
              const { data } = await axios.get(`/api/order/${orderId}`, {
                headers: { authorization: `Bearer ${userInfo.data.token}` },
              });

              alert(data)
            
              dispatch({ type: 'FETCH_SUCCESS', payload: {data} });
            } catch (err) {
              dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
            }
          };
          if (!order._id || (order._id && order._id !== orderId)) {
            fetchOrder();
          }

    },[order])

 
    const {closeSnackbar,enqueueSnackbar} = useSnackbar();
 

  return (
    <Layout title="OrderDetails">
        <StepsWizard activeStep={3}></StepsWizard>
        <Typography  variant="h5" className={classes.marginTopBtm} style={{textTransform:'uppercase'}}>Order_Id : {userInfo.data._id}</Typography>
      
            { loading ? (<CircularProgress/>) : error ? (<Typography>{error}</Typography>) : 
                 (<Grid container spacing={1}>
                 <Grid item md={9} xs={12}>
                     <Card variant='outlined'  style={{margin:'0 20px 20px 0px'}}>
                         <CardContent>
                             <Typography variant='h6' className={classes.marginTopBtm} style={{textTransform:'uppercase'}}> shipping-Address</Typography>
                             <Typography variant='subtitle1'>
                             {shippingAddress.fullName}, {shippingAddress.address},{' '}
                  {shippingAddress.city}, {shippingAddress.postalCode},{' '}
                  {shippingAddress.country}
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
                                 {orderItems.map((item) => (
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
                            
                             <ListItem><Typography variant='subtitle1' className={classes.upperCase}>Tax-Price :  <b>{'$' + taxPrice}</b></Typography></ListItem>
                             <ListItem><Typography variant='subtitle1' className={classes.upperCase}><b>Total-Price</b> :  <b>{'$' + TotalPrice}</b></Typography></ListItem>
                            
                         </List>
                     </Card>
                 </Grid>
                
             </Grid>)
            
            }
               
            

        
    </Layout>
  )
}



export default dynamic(() => Promise.resolve(Order),{ssr:false} )

export async function getServerSideProps({ params }) {
    return { props: { params } };
  }