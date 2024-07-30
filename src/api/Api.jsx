import axios from 'axios';

export const CountryApi = async () => {
  try {
    let url = "https://crio-location-selector.onrender.com/countries";
    let response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching countries: ", error);
    return []; 
  }
}

export const StateApi = async (countryName) => {
  try {
    let url = `https://crio-location-selector.onrender.com/country=${countryName}/states`;
    let response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching states: ", error);
    return []; 
  }
}

export const CityApi = async (countryName, stateName) => {
  try {
    let url = `https://crio-location-selector.onrender.com/country=${countryName}/state=${stateName}/cities`;
    let response = await axios.get(url);
    return response.data;
  } catch (error) {
    console.error("Error fetching cities: ", error);
    return []; 
  }
}
