import { Grid, Typography,Button, Card , List,ListItem,TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Select, MenuItem, ButtonBase } from '@material-ui/core';
import React, { useContext } from 'react'
import Layout from '../Componets/Layout'
import Store from '../utils/store'
import NextLink from 'next/link'
import useStyles from '../utils/styles';
import Image from 'next/image';
import dynamic from 'next/dynamic'
import {useRouter} from 'next/router'

 function cart() {
    const router = useRouter();
    const {state,dispatch} = useContext(Store);
    const classes = useStyles()
    const {cart:{cartItems}} = state;
    const updateHandler = async(item,quantity)=>{
        const prods = await fetch(`/api/products/${item._id}`,{method:'GET'})
        if (prods.countInStock <= 0) {
            window.alert('sorry Products out of stock...')
            return;
        }
        dispatch({type:'ADD_TO_CART',payload:{...item,quantity}})
    }

    const removeHandler = (item)=>{
        dispatch({type:'REMOVE_FROM_CART',payload:item})
    }

    const checkoutHandler = ()=>{
        router.push('/shipping')
    }

  return (
    <Layout title="shopping-cart">
        <Typography  variant="h4" className={classes.marginTopBtm} style={{textTransform:'uppercase'}}>Shopping Cart</Typography>
        {cartItems.length === 0 ? (<div>No Items fOUND in cart. <Button color="primary" className={classes.marginTopBtm}><NextLink href="/">Go to Shopping</NextLink></Button> </div>) :
            (
                <Grid container spacing={1}>
                    <Grid item md={9} xs={12}>
                        <TableContainer style={{paddingRight:'50px'}}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Image</TableCell>
                                        <TableCell>Name</TableCell>
                                        <TableCell >Quantity</TableCell>
                                        <TableCell >Price</TableCell>
                                        <TableCell>ACTIONS</TableCell>
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
                                                    <Select value={item.quantity} onChange={(e)=> updateHandler(item,e.target.value)}>
                                                            {/* <MenuItem value={1}>1</MenuItem>
                                                            <MenuItem value={2}>2</MenuItem>
                                                            <MenuItem value={3}>3</MenuItem> */}
                                                        {[...Array(item.countInStock).keys()].map((x)=> (<MenuItem key={x+1} value={x+1}>{x+1}</MenuItem>))}
                                                    </Select>
                                                </Typography>
                                            </TableCell>
                                            <TableCell>
                                                <Typography>${item.price}</Typography>
                                            </TableCell>
                                            <TableCell>
                                               <Button color="primary" onClick={() => removeHandler(item)}>Delete(x)</Button>
                                            </TableCell>

                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Grid>
                    <Grid item md={3} xs={12}>
                        <Card>
                            <List>
                                <ListItem><Typography>SubTotal : {cartItems.reduce((a,c)=>a + c.quantity,0) + ' ' + 'ITEMS' + ' - ' + cartItems.reduce((a,c)=>a + c.quantity * c.price, 0) + ' ' + 'PRICE' }</Typography></ListItem>
                               
                                <ListItem> <Button variant='contained' color='primary' fullWidth  onClick={checkoutHandler}>Checkout</Button></ListItem>
                            </List>
                        </Card>
                    </Grid>
                </Grid>
            )

        }
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(cart),{ssr:false} )
