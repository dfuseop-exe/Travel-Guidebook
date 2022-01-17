import { CircularProgress, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@material-ui/core'
import React , {useState , useEffect , createRef} from 'react'
import useStyles from './styles';
import PlaceDetails from '../PlaceDetails/PlaceDetails'


const List = ({places , childCliked , isLoading , type ,setType , rating , setRating}) => {

    
    const [elRefs, setElRefs] = useState([])

    useEffect(() => {
        setElRefs((refs) => Array(places?.length).fill().map((_, i) => refs[i] || createRef()));
      }, [places]);

    const classes = useStyles();
    return (
        <div className={classes.container} >
            <Typography style={{fontFamily : 'Montserrat' }} variant='h4'>
                <span style={{color : "#7b2cbf"  , fontWeight : 'bold'}}>Explore</span> Restaurants , Hotels & Attractions Around You .</Typography>
            {isLoading ? (
                <div className={classes.loading}>
                    <CircularProgress size="5rem"/>
                </div>
            ) : (
            <>
                <FormControl className={classes.formControl}>
                    <InputLabel>Type</InputLabel>
                    <Select value={type} onChange={(e)=>{setType(e.target.value)}}>
                        <MenuItem value="restaurants">Restaurants</MenuItem>
                        <MenuItem value="hotels">Hotels</MenuItem>
                        <MenuItem value="attractions">Attractions</MenuItem>
                    </Select>
                </FormControl>

                <FormControl className={classes.formControl}>
                    <InputLabel>Rating</InputLabel>
                    <Select value={rating} onChange={(e)=>{setRating(e.target.value)}}>
                        <MenuItem value={0} selected>All</MenuItem>
                        <MenuItem value={3.0}>Above 3.0</MenuItem>
                        <MenuItem value={4.0}>Above 4.0</MenuItem>
                        <MenuItem value={4.5}>Above 4.5</MenuItem>
                    </Select>
                </FormControl>

                <Grid container spacing={3} className={classes.list}>
                    {places?.map((place , i)=>{
                        return <Grid ref={elRefs[i]} key={i} item xs={12}>
                        <PlaceDetails selected={Number(childCliked) === i} refProp={elRefs[i]} place={place} />
                      </Grid>
                    })}
                </Grid>
            </>) }
        </div>
    )
}

export default List
