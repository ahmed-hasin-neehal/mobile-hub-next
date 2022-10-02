import { Grid, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import { useRouter } from 'next/router';
import React from 'react'
import Layout from '../components/Layout'

export default function Orders() {
    var user = JSON.parse(localStorage.getItem('user'));
    var cart = JSON.parse(localStorage.getItem('cart'));
    const router = useRouter();
    const goToInvoice = async () => {
        router.push(`/invoice`);
    }
    return (
        <Layout title="Orders List">
            <Typography component="h1" variant="h1">Orders List</Typography>
            <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Order ID</TableCell>
                                    <TableCell>Customer Name</TableCell>
                                    <TableCell align="right">Items Quantity</TableCell>
                                    <TableCell align="right">Total Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                <TableRow onClick={goToInvoice}>
                                    <TableCell>
                                        <Typography>{Date.now()}</Typography>
                                    </TableCell>
                                    <TableCell>
                                        <Typography>{user.name}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography>{cart.reduce((a, c) => a + c.quantity, 0)}</Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Typography>${cart.reduce((a, c) => a + c.quantity * c.price, 0)}</Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
            </Grid>
        </Layout>
    )
}
