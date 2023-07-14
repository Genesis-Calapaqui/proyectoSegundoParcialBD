import React from 'react'
import { AppBar, IconButton, Typography, Toolbar } from '@material-ui/core'
import { Menu as MenuIcon } from '@material-ui/icons'

const Header = ({ setOpen }) => {

    
    return (
        
        <AppBar style={{backgroundColor:'rgb(56, 180, 2)'}}>
            <Toolbar>
                <IconButton edge='start' color='inherit'  onClick={() => setOpen(true)}>
                    <MenuIcon style={{width:'45px',height:'50px'}}/>
                </IconButton>
                <Typography style={{ flexGrow: 1 }}> </Typography>
               {/* <Button variant='text' color='inherit' onClick={() => {
                   // localStorage.setItem('auth', '"no"');
                    localStorage.clear()
                    history.push('/login')
                }}>Log out</Button>*/}
            </Toolbar>
        </AppBar>
    )
}

export default Header
