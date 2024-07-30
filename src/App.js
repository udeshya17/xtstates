import './App.css';
import { CityApi, CountryApi, StateApi } from './api/Api';
import { useState, useEffect } from 'react';

function App() {
  const [countryData, setCountryData] = useState([]);
  const [stateData, setStateData] = useState([]);
  const [countryName, setCountryName] = useState('');
  const [stateName, setStateName] = useState("");
  const [cityData, setCityData] = useState([]);
  const [cityName, setCityName] = useState('');


  useEffect(() => {
    async function fetchCountries() {
      try {
        const countries = await CountryApi();
        setCountryData(countries);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    }
    fetchCountries();
  }, []);

  const handleCountryChange = (e) => {
    setCountryName(e.target.value);
    // console.log(countryName);
    setStateData([]);
    setCityData([])
    setStateName('');
  };

  useEffect(() => {
    if (countryName) {
      async function fetchState() {
        try {
          const states = await StateApi(countryName);
          setStateData(states);
        } catch (error) {
          console.error("Error fetching state data:", error);
        }
      }
      fetchState();
    }
  }, [countryName]); 

  const handleStateChange = (e)=>{
    setStateName(e.target.value);
    setCityData([]);
    setCityName('')
  }

  useEffect(()=>{
    if(stateName){
      async function fetchCity(){
        try{
          let cities = await CityApi(countryName, stateName);
          setCityData(cities);
        }
        catch(error){
          console.error("Error in fetching city : ", error);
        }
      }
      fetchCity();
    }
  },[stateName])

  const handleCityChange = (e)=>{
    setCityName(e.target.value)
  }

  return (
    <div style={{textAlign: 'center'}}>
      <h1 >Select Location</h1>
      <div style={{display:'flex', gap:'30px', textAlign:'center', justifyContent:'center'}}>
      <select onChange={handleCountryChange}>
        <option>Select Country</option>
        {countryData.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      {(countryName)? 
      <select onChange={handleStateChange}>
        <option>Select State</option>
        {stateData.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      : <select disabled>
      <option>Select State</option>
      {stateData.map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>}
    {(stateName) ? 
      <select onChange={handleCityChange}>
        <option>Select City</option>
        {cityData.map((item) => (
          <option key={item} value={item}>{item}</option>
        ))}
      </select>
      : <select disabled>
      <option>Select City</option>
      {cityData.map((item) => (
        <option key={item} value={item}>{item}</option>
      ))}
    </select>
    }
      </div>
      <br/>
      {(cityName && countryData && stateName) ?
        <div>
        <span><b>You selected </b></span>
        <span style={{fontSize:'25px', fontWeight:'10px'}}><b>{cityName},</b></span>
        <span style={{fontSize:'20px', fontWeight:'10px', color:'gray'}}><b>{stateName},</b></span>
        <span style={{fontSize:'17px', fontWeight:'10px', color:'gray'}}><b>{countryName}</b></span>
      </div>  
      : ""}
      
    </div>

  );
}

export default App;
