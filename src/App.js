import { CssBaseline, Grid } from '@material-ui/core';
import react , {useEffect , useState} from 'react'
import {getPlacesData} from './api'

//Components
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';




const App = ()=> {

  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childCliked, setChildCliked] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords : {latitude , longitude}})=>{
        setCoordinates({lat :latitude , lng : longitude});
    })
    
  }, [])
  

  useEffect(() => {

    try {
      setIsLoading(true);
      const fetchData = async() => {
        const data = await getPlacesData(bounds.sw, bounds.ne);
        setIsLoading(false);

        console.log(data)
        setPlaces(data)
      }

      fetchData();
    } catch (error) {
      console.log(error)
    }
    
  }, [coordinates , bounds])

  return (
    <>
      <CssBaseline/>
      <Header/>

      <Grid container spacing={3} style={{width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List places={places} childCliked={childCliked} isLoading={isLoading} />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoordinates={setCoordinates}
               setBounds={setBounds}
               coordinates={coordinates}
               places={places}
               setChildCliked={setChildCliked}
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
