<template>
    <div class="box container">
      <!-- Weather and information for current day and hour -->
      <div class="box">
        <div class="is-flex is-align-items-center is-justify-content-space-between pb-">
          <div>
            <h2 class="is-size-2">{{city.name}}</h2>
            <h4 class="is-size-4">{{city.region}}, {{city.country}}</h4>
          </div>
          <!-- <img src="../assets/Weather Icons/sun.svg" width="130" alt="Sunny"> -->
          <div>
            <img :src="weather.weather[0].iconUrl" :alt="weather.weather[0].description" loading="lazy">
          </div>
          <div>
            <h2 class="is-size-2">{{Math.round(weather.temp)}} {{temperature.label}}</h2>
            <h6 class="is-size-6">{{weather.weather[0].description}}</h6>
          </div>
          <div>
            <h5 class="is-size-5">Humidity: {{weather.humidity}}%</h5>
            <h5 class="is-size-5">Precipitation: {{weather.pop * 100}}%</h5>
          </div>
        </div>
				<span class="is-pulled-right mb-3" style="opacity:25%">
					Weather provided by openweathermap.org
				</span>
      </div>
      <!-- Choose different hours -->
      <div class="box">
        <b-field>
          <b-slider ticks @input="$emit('changeHour', hour)" size="is-size-medium" :min="Math.floor(new Date().getHours())" :max="24" indicator v-model="hour"></b-slider>
        </b-field>
      </div>
      <!-- Different days -->
      <div class="box"></div>
    </div>
</template>

<script>
export default {
    
    props: {
      city: {
          type: Object,
          default: null,
      },
      weather: {
        type: Object,
        default: null,
      },
      temperature: {
        type: Object,
        default:  function () {
          return {units: 'standard', label: 'ºK'}
        }  
      }
    },

    data () {
      return {
        hour: ''
      }
    },

    methods: {

    },

    created () {
      // console.log(new Date().getHours());
      this.hour = Math.floor(new Date().getHours())
    }

}
</script>

<style>

</style>