import { CssBaseline, Grid } from '@material-ui/core';
import react , {useEffect , useState} from 'react'
import {getPlacesData , getWeatherData} from './api'

//Components
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import PlaceDetails from './components/PlaceDetails/PlaceDetails';




const App = ()=> {

  const [weatherData, setWeatherData] = useState([]);
  const [places, setPlaces] = useState([]);
  const [coordinates, setCoordinates] = useState({});
  const [bounds, setBounds] = useState({});
  const [childCliked, setChildCliked] = useState(null)
  const [isLoading, setIsLoading] = useState(false);

  const [type, setType] = useState("restaurants");
  const [rating, setRating] = useState("");

  const [filteredPlaces, setFilteredPlaces] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(({coords : {latitude , longitude}})=>{
        setCoordinates({lat :latitude , lng : longitude});
    })
    
  }, [])

  useEffect(() => {
    setIsLoading(true);
    const filtered = places.filter((place) => Number(place.rating) > rating);
    setIsLoading(false);
    setFilteredPlaces(filtered);
    
  }, [rating]);
  

  useEffect(() => {

    try {
      setIsLoading(true);
      if(bounds){
        setIsLoading(true);

      const Fetchweather =  async () => {
        const data = await getWeatherData(coordinates.lat , coordinates.lng);
        setWeatherData(data);
      }

      Fetchweather();
      const fetchData = async() => {
        const data = await getPlacesData(type ,bounds.sw, bounds.ne);
        setIsLoading(false);
        setFilteredPlaces([]);
    
        setPlaces(data.filter((place) => place.name && place.num_reviews > 0));
      }

      fetchData();
      }
    } catch (error) {
      console.log(error)
    }
    
  }, [coordinates , bounds , type])

  return (
    <>
      <CssBaseline/>
      <Header setCoordinates={setCoordinates}/>

      <Grid container spacing={3} style={{width: '100%'}}>
        <Grid item xs={12} md={4}>
          <List 
               places={filteredPlaces.length ? filteredPlaces : places} 
              childCliked={childCliked} 
              isLoading={isLoading} 
              type={type}
              setType={setType}
              setRating={setRating}
              rating={rating}
            />
        </Grid>
        <Grid item xs={12} md={8}>
          <Map setCoordinates={setCoordinates}
               setBounds={setBounds}
               coordinates={coordinates}
               places={filteredPlaces.length ? filteredPlaces : places}
               setChildCliked={setChildCliked}
               weatherData={weatherData}
               
          />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
