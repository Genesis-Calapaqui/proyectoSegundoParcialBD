import React from 'react'
import { Drawer, Paper, IconButton, Divider } from '@material-ui/core'
import { useStyles } from '../../../style/style'
import { Menu as MenuIcon } from '@material-ui/icons'
import { Link, useRouteMatch, useLocation } from "react-router-dom"

const MainMenu = ({ open, setOpen }) => {
    const classes = useStyles()

    return (
        <Drawer anchor='left' open={open} onClose={() => setOpen(false)}>
            <Paper className={classes.paper} elevation={0}>
                <div className={classes.div}>
                    <IconButton edge='start' color='inherit' onClick={() => setOpen(false)}>
                        <MenuIcon style={{width:'45px',height:'50px'}}/>
                    </IconButton>
                    <h1>Registros</h1>
                   {/* <img src={Logo} alt='...' className={classes.logo} /><br></br>*/}
                    
                </div>
                <Divider />
            </Paper>
            <div style={{ border: '1px solid black', padding: '10px' ,backgroundColor:'rgb(56, 180, 2)'}}>
                <CustomLink to="/App" style={{fontSize:'15px', color:'black'}}><strong >Inicio</strong></CustomLink>
                {/* <CustomLink to="/about">About</CustomLink> */}
            </div>
            <div style={{ border: '1px solid black', padding: '10px' ,backgroundColor:'rgb(56, 180, 2)'}}>
                <CustomLink to="/gestionar_usuario" style={{fontSize:'15px', color:'black'}}><strong >Usuarios</strong></CustomLink>
                {/* <CustomLink to="/about">About</CustomLink> */}
            </div>
            <div style={{ border: '1px solid black', padding: '10px' ,backgroundColor:'rgb(56, 180, 2)'}}>
                <CustomLink to="/gestionar_acta" style={{fontSize:'15px', color:'black'}}><strong >Actas</strong></CustomLink>
                {/* <CustomLink to="/about">About</CustomLink> */}
            </div>
            <div style={{ border: '1px solid black', padding: '10px' ,backgroundColor:'rgb(56, 180, 2)'}}>
                <CustomLink to="/gestionar_autor" style={{fontSize:'15px', color:'black'}}><strong >Autores</strong></CustomLink>
                {/* <CustomLink to="/about">About</CustomLink> */}
            </div>
        </Drawer>
    )
}
function CustomLink({ to, children, ...props }) {
    const resolvedPath = useLocation(to)
    const isActive = useRouteMatch({ path: resolvedPath.pathname, end: true })
  
    return (
      <li className={isActive ? "active" : ""}>
        <Link to={to} {...props}>
          {children}
        </Link>
      </li>
    )
  }
export default MainMenu
