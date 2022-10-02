import { Card, Grid, List, ListItem, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@material-ui/core'
import Layout from '../components/Layout'
import Image from 'next/image';

export default function Invoice() {
    var cart = JSON.parse(localStorage.getItem('cart'));
    var user = JSON.parse(localStorage.getItem('user'));
    return (
        <Layout title="Invoice">
            <Typography component="h1" variant="h1">Invoice</Typography>
            <Typography component="h2" variant="h2">Customer Details</Typography>
            <Grid container spacing={1}>
                <Grid item md={12} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}><Typography>Name</Typography></Grid>
                                    <Grid item xs={6}><Typography>{user.name}</Typography></Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}><Typography>Phone Number</Typography></Grid>
                                    <Grid item xs={6}><Typography>{user.phone}</Typography></Grid>
                                </Grid>
                            </ListItem>
                            <ListItem>
                                <Grid container>
                                    <Grid item xs={6}><Typography>Address</Typography></Grid>
                                    <Grid item xs={6}><Typography>{user.address}</Typography></Grid>
                                </Grid>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
            <Typography component="h2" variant="h2">Ordered Product Details</Typography>
            <Grid container spacing={1}>
                <Grid item md={9} xs={12}>
                    <TableContainer>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>Image</TableCell>
                                    <TableCell>Name</TableCell>
                                    <TableCell align="right">Quantity</TableCell>
                                    <TableCell align="right">Price</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {cart.map((item) => (
                                    <TableRow key={item.id}>
                                        <TableCell>
                                            <Image src={item.image} alt={item.name} width={50} height={50}></Image>
                                        </TableCell>
                                        <TableCell>
                                            <Typography>{item.name}</Typography>
                                        </TableCell>
                                        <TableCell align="right">
                                            {item.quantity}
                                        </TableCell>
                                        <TableCell align="right">{item.price}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Grid>
                <Grid md={3} xs={12}>
                    <Card>
                        <List>
                            <ListItem>
                                <Typography variant="h2">
                                    Subtotal ({cart.reduce((a, c) => a + c.quantity, 0)}{' '}Item(s))
                                    : ${cart.reduce((a, c) => a + c.quantity * c.price, 0)}
                                </Typography>
                            </ListItem>
                        </List>
                    </Card>
                </Grid>
            </Grid>
        </Layout>
    )
}