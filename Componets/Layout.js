import React, { useContext,useEffect,useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Head from 'next/head'
import Container from '@material-ui/core/Container';
import UseStyles from '../utils/styles'
import Link from 'next/link'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { createTheme } from '@material-ui/core/styles';
import { MuiThemeProvider } from '@material-ui/core/styles';
import { Badge, CssBaseline, Menu, MenuItem} from '@material-ui/core';
import {Switch} from '@material-ui/core';
import Store from '../utils/store';
import Cookies from 'js-cookie'
import NextLink from 'next/link'
import {useRouter } from 'next/router';
import dynamic from 'next/dynamic';


const Layout = (props) => {
  const {state, dispatch} = useContext(Store)
  const {darkMode,cart,userInfo} = state;
  const router = useRouter();
  // const [badge,setBadge] = useState(false);
  const theme = createTheme({
    palette: {
      type: darkMode ? 'dark' : 'light',
      primary: {
        main: '#9a0036',
      },
      secondary: {
        main: '#208080',
      },
    }
  })
   const classes = UseStyles();
   const handleDarkToggler = ()=>{
      dispatch({type : darkMode ? 'DARK_MODE_OFF' : 'DARK_MODE_ON'});
      const newDarkMode = !darkMode;
      Cookies.set('darkMode',newDarkMode ? 'ON':'OFF')
   }
  //  useEffect(()=>{
  //     if (cart.cartItems.length > 0) {
  //       setBadge(true)
  //     }
  //  },[])
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutHandler = ()=>{
    setAnchorEl(null);
    dispatch({type:'LOGOUT_HANDLE'})
    Cookies.remove('userInfo')
    Cookies.remove('cartItems')
    router.push('/')
  }

  return (
    <div>
      <Head>
          <title>{props.title ? props.title : 'Products-App'}</title>
          {props.description && <meta name="description" content={props.description}></meta>}
      </Head>
      <MuiThemeProvider  theme={theme}>
      <CssBaseline />
      <AppBar position="static" className={classes.navbar}>
        <Toolbar className={classes.flexWrap}>
          {/* <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton> */}
          <NextLink href="/" passHref>
              <a><Typography component='h5' variant="h5" >
                ProductsApp
              </Typography></a>
          </NextLink>
          <div className={classes.grow}>
            <Switch checked={darkMode}  onChange={handleDarkToggler}></Switch>
              <NextLink  href="/cart" passHref>
              
                  <a> 
                        {cart.cartItems.length > 0 ? (<Badge badgeContent={cart.cartItems.length} color="secondary" overlap="circular"><ShoppingCartIcon className={classes.shopIcon}/></Badge>) : (<ShoppingCartIcon className={classes.shopIcon}/>)
            
                                }
                   </a>
                </NextLink>
                {userInfo ? 
                  <>
                <Button className={classes.navbarButton}  aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} >{userInfo.data.name}</Button> 
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    keepMounted
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                  >
                    <MenuItem onClick={handleClose}>Profile</MenuItem>
                    <MenuItem onClick={handleClose}>My account</MenuItem>
                    <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                  </Menu>
                  
                
                </>:

                <NextLink href="/login" passHref>
                    <a><Typography variant="h6">
                      Login
                    </Typography></a>
                </NextLink>}
        </div>
        </Toolbar>
     
        {/* <Button color="inherit">Login</Button> */}
    </AppBar>
    <Container className={classes.customContainer}>
        {props.children}
    </Container>
    
      <footer className={classes.customFooter}>
          <Typography>All Rights Reserved @2022</Typography>
      </footer>
      </MuiThemeProvider>
    </div>
  )
}

export default dynamic(() => Promise.resolve(Layout),{ssr:false})