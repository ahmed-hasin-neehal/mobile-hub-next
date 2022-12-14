import { Button, Card, Grid, Link, List, ListItem, Typography } from '@material-ui/core';
import Image from 'next/image';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useContext } from 'react';
import Layout from '../../components/Layout';
import data from '../../utils/data';
import { Store } from '../../utils/Store';
import useStyles from '../../utils/styles';

export default function ProductScreen() {
    const { state, dispatch } = useContext(Store);
    const classes = useStyles();
    const router = useRouter();
    const { slug } = router.query;
    const product = data.products.find(a => a.slug === slug);
    if (!product) {
        return <div>Product not Found</div>
    }
    const addToCartHandler = async () => {
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
        <Layout title={product.name} description={product.description}>
            <div className={classes.section}>
                <NextLink href="/" passHref>
                    <Link><Typography>Back to Products</Typography></Link>
                </NextLink>
            </div>
            <Grid container spacing={1}>
                <Grid item md={4} xs={12}>
                    <Image src={product.image} alt={product.name} width={640} height={640} layout="responsive"></Image>
                </Grid>
                <Grid item md={5} xs={12}>
                    <List>
                        <ListItem><Typography component="h1" variant="h1">{product.name}</Typography></ListItem>
                        <ListItem><Typography>Category: {product.category}</Typography></ListItem>
                        <ListItem><Typography>Brand: {product.brand}</Typography></ListItem>
                        <ListItem><Typography>Rating: {product.rating} stars ({product.numReviews} reviews)</Typography></ListItem>
                        <ListItem><Typography className={classes.description}>Description: {product.description}</Typography></ListItem>
                    </List>
                </Grid>
                <Grid item md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}><Typography>Price</Typography></Grid>
                                    <Grid item xs={6}><Typography>${product.price}</Typography></Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}><Typography>Stock</Typography></Grid>
                                    <Grid item xs={6}><Typography>{product.countInStock > 0 ? 'In Stock' : 'Unavailable'}</Typography></Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}><Typography>Available Qty.</Typography></Grid>
                                    <Grid item xs={6}><Typography>{product.countInStock}</Typography></Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Button fullWidth variant="contained" color="primary" onClick={addToCartHandler}>Add to Cart</Button>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}
