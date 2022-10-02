import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Grid, Typography } from '@material-ui/core';
import NextLink from 'next/link';
import { useContext } from 'react';
import Layout from '../components/Layout';
import data from '../utils/data';
import { Store } from '../utils/Store';

export default function Home() {
  const { state, dispatch } = useContext(Store);
  const addToCartHandler = async (product) => {
    const existItem = state.cart.cartItems.find(x => x.name === product.name);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (product.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock.');
      return;
    }
    dispatch({ type: 'CART_ADD_ITEM', payload: { ...product, quantity } });
    window.alert('The product has been added to Cart.');
  };
  return (
    <Layout>
      <div>
        <h1>Products</h1>
        <div></div>
        <Grid container spacing={3}>
          {data.products.map((product) => (
            <Grid item md={4} xs={12} key={product.name}>
              <Card>
                <NextLink href={`/product/${product.slug}`} passHref>
                  <CardActionArea>
                    <CardMedia component="img" image={product.image} title={product.name}></CardMedia>
                    <CardContent>
                      <Typography component="h2" variant="h2">{product.name}</Typography>
                    </CardContent>
                  </CardActionArea>
                </NextLink>
                <CardActions>
                  <Typography>${product.price}</Typography>
                  <Button size="small" color="primary" variant="contained" onClick={() => addToCartHandler(product)}>Add to Cart</Button>
                  <Button size="small" color="secondary" variant="contained">Overview</Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </div>
    </Layout>
  )
}