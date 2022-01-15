import { type } from "@testing-library/user-event/dist/type";
import axios from "axios";





export const getPlacesData = async (type , sw , ne)=>{

    try {
        const {data : {data}} = await axios.get(
          `https://travel-advisor.p.rapidapi.com/${type}/list-in-boundary`
          , {
          url: 'https://travel-advisor.p.rapidapi.com/restaurants/list-in-boundary',
          params: {
            bl_latitude: sw.lat,
            bl_longitude: sw.lng,
            tr_longitude: ne.lng,
            tr_latitude: ne.lat,
          },
          headers: {
            'x-rapidapi-host': 'travel-advisor.p.rapidapi.com',
            'x-rapidapi-key': '22f7b6ca15msh228e521f022c1b4p1b621ejsn7cfdacc043b7'
          }
        });
        return data;

    } catch (error) {
        console.error(error);
    }
}



