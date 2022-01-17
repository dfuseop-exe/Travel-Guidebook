import React , {useState} from 'react'
import { AppBar, Box, InputBase, Toolbar, Typography } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import { Autocomplete } from '@react-google-maps/api'
//css
import useStyles from './styles'


const Header = ({setCoordinates}) => {

    const [autocomplete, setAutocomplete] = useState(null)

    const onLoad = (autoC) => setAutocomplete(autoC);

  const onPlaceChanged = () => {
    const lat = autocomplete.getPlace().geometry.location.lat();
    const lng = autocomplete.getPlace().geometry.location.lng();
    console.log(lat ,  lng)
    setCoordinates({ lat, lng });
  };

    const classes = useStyles();

    return (
       <AppBar position="sticky" styles={{backgroundColor: "#06d6a0" ,
       height: "39px"}}>
           <Toolbar className={classes.toolbar}  >
                <Typography variant="h5" className={classes.title}>
                    Travel Guidebook
                </Typography>
                <Box display="flex">
                    <Typography variant="h6" className={classes.title}>
                        Explore New Places
                    </Typography>
                    <Autocomplete onLoad={onLoad} onPlaceChanged={onPlaceChanged}>
            <div className={classes.search}>
              <div className={classes.searchIcon}>
                <SearchIcon />
              </div>
              <InputBase placeholder="Search…" classes={{ root: classes.inputRoot, input: classes.inputInput }} />
            </div>
          </Autocomplete>
                </Box>
           </Toolbar>
       </AppBar>
    )
}

export default Header
