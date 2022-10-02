import React, { useContext, useState } from 'react'
import useStyles from '../utils/styles';
import Layout from '../components/Layout'
import { Button, List, ListItem, TextField, Typography } from '@material-ui/core';
import { Store } from '../utils/Store';
import { useRouter } from 'next/router';

export default function Checkout() {
    const router = useRouter();
    const [user, setUser] = useState({ name: '', email: '', phone: '', address: '' });
    const classes = useStyles();
    const { dispatch } = useContext(Store);

    const placeOrder = async (e) => {
        e.preventDefault();
        localStorage.setItem('user', JSON.stringify(user));
        dispatch({ type: 'CART_CLEAR' });
        router.push(`/invoice`);
    }
    const handleChange = (e) => {
        setUser({ ...user, [e.target.id]: e.target.value });
    }
    return (
        <Layout title="Checkout">
            <form className={classes.form}>
                <Typography component="h1" variant="h1">Checkout Details</Typography>
                <List>
                    <ListItem>
                        <TextField variant="outlined" fullWidth required id="name" label="Your Full Name" inputProps={{ type: 'text' }} onChange={handleChange}></TextField>
                    </ListItem>
                    <ListItem>
                        <TextField variant="outlined" fullWidth required id="email" label="Email Address" inputProps={{ type: 'email' }} onChange={handleChange}></TextField>
                    </ListItem>
                    <ListItem>
                        <TextField variant="outlined" fullWidth required id="phone" label="Phone Number" inputProps={{ type: 'number' }} onChange={handleChange}></TextField>
                    </ListItem>
                    <ListItem>
                        <TextField variant="outlined" fullWidth required id="address" label="Shipping Address" inputProps={{ type: 'text' }} onChange={handleChange}></TextField>
                    </ListItem>
                    <ListItem>
                        <Button variant="contained" fullWidth color="primary" onClick={placeOrder}>Place Order</Button>
                    </ListItem>
                </List>
            </form>
        </Layout>
    )
}
