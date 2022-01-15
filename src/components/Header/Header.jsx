import React from 'react'
import { AppBar, Box, InputBase, Toolbar, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Autocomplete } from '@react-google-maps/api'
//css
import useStyles from './styles'


const Header = () => {

    const classes = useStyles();

    return (
       <AppBar position="static" styles={{backgroundColor: "#1a73e8" ,
       height: "39px"}}>
           <Toolbar className={classes.toolbar} >
                <Typography variant="h5" className={classes.title}>
                    Travel Advisor
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore New Places
                    </Typography>
                    {/* <Autocomplete> */}
                        <div className={classes.search}>
                            <div className={classes.searchIcon}>
                                <SearchIcon/>
                            </div>
                            <InputBase placeholder="Search..." classes={{root : classes.inputRoot , input:classes.inputInput}}/>
                        </div>
                    {/* </Autocomplete> */}
                </Box>
           </Toolbar>
       </AppBar>
    )
}

export default Header
