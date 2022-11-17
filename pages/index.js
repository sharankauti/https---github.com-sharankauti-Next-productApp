import { Card, CardActionArea, CardActions, CardContent, CardMedia, Grid,Typography,Button } from "@material-ui/core"
import Layout from "../Componets/Layout"
import NextLink from 'next/link'
import db from "../utils/db"
import productModel from "../modals/product"
import useStyles from "../utils/styles"
import { useContext } from 'react';
import Store from '../utils/store';
import {useRouter} from 'next/router'
export default function Home({products}) {

  const classes = useStyles()
  const router = useRouter();
  const {state,dispatch} = useContext(Store)

  const cartHandler = async (prod)=>{
    const prods = await fetch(`/api/products/${prod._id}`,{method:'GET'})
        if (prods.countInStock <= 0) {
            window.alert('sorry Products out of stock...')
            return;
        }
        const existingItem = state.cart.cartItems.find((item)=> item._id === prod._id)
        const quantity = existingItem ? existingItem.quantity + 1 : 1
        dispatch({type:'ADD_TO_CART',payload:{...prod,quantity:quantity}})
        router.push('/cart')
  }

  return (
    <>
      <Layout>
          <Grid container spacing={2}>
              {products.map((prod)=>{
               return (<Grid item key={prod.name} md={4}>
                   <Card className={classes.customCard}>
                    <NextLink href={`/product/${prod.slug}`} passHref>
                    <CardActionArea>
                      <CardMedia component='img' className={classes.cardImg} image={prod.image} alt={prod.name}></CardMedia>
                      <CardContent>
                          <Typography  color="textSecondary" gutterBottom>
                              {prod.name}
                          </Typography>
                          <Typography  color="textSecondary">
                              {prod.category}
                          </Typography>
                      </CardContent>
                      </CardActionArea>
                      </NextLink>
                      <CardActions>
                          <Typography color="textSecondary" component="p">
                             ${prod.price}
                          </Typography>
                          <Button size="small" color="secondary" variant="outlined" onClick={() => cartHandler(prod)}>
                            Add To Cart
                          </Button>
                      </CardActions>
                   </Card>
                </Grid>)
              })}
          </Grid>
      </Layout>
    
    </>
  )
}

export async function getServerSideProps(){
  await db.connect();
  const products = await productModel.find({}).lean()
  await db.disconnect();

  return {
    props:{products : products.map(db.convertDocToObj)}
  }
}
