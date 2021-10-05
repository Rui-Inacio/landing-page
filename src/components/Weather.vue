<template>

  <!-- TODO: SET ATTRIBUTE FOR WEATHER PACK ICONS -->
  <!-- <div>Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a></div> -->
  <div>
    <WeatherByCity
      v-if="renderReady" 
      :city="chosenCity" 
      :temperature="temperature" 
      :weather="chosenWeather"
      @changeHour="changeHour">
    </WeatherByCity>
  </div>
  
</template>

<script>

import axios from 'axios';

export default {

  components: {
    WeatherByCity : () => import('./WeatherByCity.vue'),
  },
  
  data () {
    return {

      renderReady: false,
      coords: null,
      chosenCity: null,
      chosenWeather: null,
      cities: [],
      weatherByCityMap: null,
      temperature: {
        units: 'metric',
        label: 'Cº'
      },

      successOnLocation: false,
      errorOnLocation: false,

    }
  },
  methods: {

    async getCurrentCoordinates () {

      this.successOnLocation = false;
      this.errorOnLocation = true;

      var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
      };

      await new Promise((resolve, reject) => {

        window.navigator.geolocation.getCurrentPosition(coords => {
        
        let coordinates = coords.coords;
        coordinates.timestamp = coords.timestamp;
        resolve(coordinates);

      }, error => {

        this.successOnLocation = false;
        this.errorOnLocation = true;
        
        reject(error);

      }, options);

      }).then(coordinates => {

        this.coords = coordinates;
        this.successOnLocation = true;
        this.errorOnLocation = false;

      }).catch(error => {
        console.error(error);
      })

    },

    async getNearbyCity (coords) {

      let locationId = coords.latitude.toString().concat("", coords.longitude.toString());
      var options = {
        method: 'GET',
        url: 'https://wft-geo-db.p.rapidapi.com/v1/geo/locations/-0.1369579-78.4638163/nearbyCities',
        params: {radius: '10', locationId: locationId},
        headers: {
          'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com',
          'x-rapidapi-key': 'cfc515e0f2mshcad70df59555ebbp158d90jsn0884d2b7f224'
        }
      };

      let response = await axios.request(options);
      
      let city = this.city = response.data.data[0];
      return city;

    } ,

    async setWeatherByCity (city) {

      let params = {
        lat: city.latitude,
        lon: city.longitude,
        appid: '42b2795eb92e8909fff2092e5a69006f',
        units: this.temperature.units
      }

      let response = await axios.get('https://api.openweathermap.org/data/2.5/onecall', {params: params});
      return response.data;

    },

    getWeatherByCity (city) { 

      this.chosenWeather = this.weatherByCityMap.get(city);
      return this.weatherByCityMap.get(city);

    },
    
    changeHour(hour){
      console.log(hour);
      this.chosenWeather = this.weatherByCityMap.get(this.chosenCity.name).hourly[hour - new Date().getHours()];
      let icon = this.chosenWeather.weather[0].icon;
      this.chosenWeather.weather[0].iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      console.log(this.chosenWeather);
    },

  },

  async created () {

    let city;
    if(!this.coords || Date.now() - this.coords.timestamp > 1000){
      await this.getCurrentCoordinates();
      city = await this.getNearbyCity(this.coords);
      city.name = city.city;
    }else{
      city = this.cities[0];
    }
    
    let weather;
    if(!this.chosenWeather || Date.now() - this.weather.date > 6000){
      weather = await this.setWeatherByCity(city);
      let icon = weather.current.weather[0].icon;
      weather.current.weather[0].iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      weather.date = Date.now();
    }else{
      weather = this.chosenWeather;
    }

    this.chosenCity = city;
    this.chosenWeather = weather.current;
    this.weatherByCityMap = new Map();
    this.weatherByCityMap.set(city.name, weather);
    this.renderReady = true;

    this.cities.forEach(city => {
      city.weather = this.getWeatherByCity(city);
      this.weatherByCityMap.set(city.name, city);
    });

    this.cities.unshift(city);

  }

}
</script>

<style>

</style>