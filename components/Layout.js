import React, { useContext } from 'react'
import Head from 'next/head'
import NextLink from 'next/link'
import Image from 'next/image'
import { AppBar, Container, createTheme, CssBaseline, Link, Switch, ThemeProvider, Toolbar, Typography, Badge, Tooltip } from '@material-ui/core'
import useStyles from '../utils/styles'
import { Store } from '../utils/Store'
import { ListAltSharp, ShoppingCartSharp } from '@material-ui/icons'

export default function Layout({ title, description, children }) {
    const { state, dispatch } = useContext(Store);
    const { darkMode, cart } = state;
    const theme = createTheme({
        typography: {
            h1: {
                fontSize: '1.6rem',
                fontWeight: 600,
                margin: '2rem 0',
            },
            h2: {
                fontSize: '1.3rem',
                fontWeight: 600,
                margin: '1rem 0',
            },
        },
        palette: {
            type: darkMode ? 'dark' : 'light',
            primary: {
                main: '#f0c000',
            },
            secondary: {
                main: '#208080',
            }
        }
    });
    const classes = useStyles();
    const darkModeChangeHandler = () => {
        dispatch({ type: darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON' });
    }
    return (
        <div>
            <Head>
                <title>{title ? `${title} - Mobile Hub` : 'Mobile Hub'}</title>
                {description && <meta description="description" content={description}></meta>}
            </Head>
            <ThemeProvider theme={theme}>
                <CssBaseline />
                <AppBar position="static" className={classes.navbar}>
                    <Toolbar>
                        <div className={classes.brand}>
                            <NextLink href="/" passHref>
                                <Link>
                                    <Image src="/images/brand-logo.jpg" alt="Brand Logo" width={50} height={50}></Image>
                                </Link>
                            </NextLink>
                        </div>

                        <div className={classes.grow}></div>
                        <div>
                            <Switch checked={darkMode} onChange={darkModeChangeHandler}></Switch>
                            <NextLink href="/cart" passHref>
                                <Link>
                                    <Tooltip disableFocusListener disableTouchListener title="Cart">
                                        {cart.cartItems.length > 0 ?
                                            (<Badge className={classes.icons} color="secondary" badgeContent={cart.cartItems.length}><ShoppingCartSharp /></Badge>)
                                            : (<Badge className={classes.icons} color="secondary" badgeContent='0'><ShoppingCartSharp /></Badge>)}
                                    </Tooltip>
                                </Link>
                            </NextLink>
                            <NextLink href="/orders" passHref>
                                <Link>
                                    <Tooltip disableFocusListener disableTouchListener title="My Orders">
                                        <ListAltSharp className={classes.icons} />
                                    </Tooltip>
                                </Link>
                            </NextLink>
                        </div>
                    </Toolbar>
                </AppBar>
                <Container className={classes.main}>
                    {children}
                </Container>
                <footer className={classes.footer}>
                    <Typography>2022 All Rights Reserved. Mobile Hub.</Typography>
                </footer>
            </ThemeProvider>

        </div>
    )
}
