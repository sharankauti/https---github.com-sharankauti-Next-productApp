import { Button, Card, CardContent, Grid, List, ListItem, Typography } from '@material-ui/core';
import Link from 'next/link';
import Layout from '../../Componets/Layout';
import Image from 'next/image'
import useStyles from '../../utils/styles';
import db from '../../utils/db';
import productModel from '../../modals/product';
import { useContext } from 'react';
import Store from '../../utils/store';
import {useRouter} from 'next/router'

const productDetail = ({product})=>{
    const router = useRouter();
    const classes = useStyles()
    const {state,dispatch} = useContext(Store)

    // const products = data.products.find(p=> p.slug === slug)
    if (!product) {
        return (
            <div>No Products</div>
        )
    }

    const cartHandler = async()=>{
        const prods = await fetch(`/api/products/${product._id}`,{method:'GET'})
        if (prods.countInStock <= 0) {
            window.alert('sorry Products out of stock...')
            return;
        }
        const existingItem = state.cart.cartItems.find((item)=> item._id === product._id)
        const quantity = existingItem ? existingItem.quantity + 1 : 1
        dispatch({type:'ADD_TO_CART',payload:{...product,quantity:quantity}})
        router.push('/cart')
      }
    return(

        <Layout title={product.name} description={product.description}>
            <Link href='/'>
                <Button color="primary" className={classes.marginTopBtm}>Back to Products</Button>
            </Link>
            <Grid container spacing={1} >
                <Grid item md={6} xs={12}>
                    <Image src={product.image} alt={product.name} width={500} height={500} layout='responsive' ></Image>
                </Grid>
                <Grid item md={3} xs={12}>
                    <List>
                        <ListItem><Typography variant='h4'>{product.name}</Typography></ListItem>
                        <ListItem><Typography>category : {product.category}</Typography></ListItem>
                        <ListItem><Typography>brand : {product.brand}</Typography></ListItem>
                        <ListItem><Typography>rating : {product.rating} stars {product.numReviews}</Typography></ListItem>
                        <ListItem><Typography>countInStock : {product.countInStock}</Typography></ListItem>
                        <ListItem><Typography>description: {product.description}</Typography> </ListItem>
                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                       
                            <List>
                                <ListItem><Typography>Price : {`${product.price}`}</Typography></ListItem>
                                <ListItem><Typography>status : {product.countInStock > 0 ? 'In stock' : 'Out of Stock'}</Typography></ListItem>
                                <ListItem> <Button variant='contained' color='primary' fullWidth onClick={cartHandler}>Add to Cart</Button></ListItem>
                            </List>
                           
                       
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}

export default productDetail


export async function getServerSideProps(context){
    const {params} = context;
    const {slug} = params;
    await db.connect();
    const product = await productModel.findOne({slug}).lean()
    await db.disconnect();
  
    return {
      props:{
        product : db.convertDocToObj(product)
      }
    }
  }