<template>
  <div class="container">

    <b-datepicker
			class="box"
      inline
      v-model="date"
      :events="allEvents"
      indicators="dots"
      @input="changeDate(date)"
    >
    </b-datepicker>

		<div class="box">
			<b-field grouped>
				<b-input v-model="event.description"></b-input>
				<b-button @click="createEvent(event)" icon-left="calendar-plus">Add Event</b-button>
			</b-field>
			<div class="card" v-for="event in shownEvents" :key="event.description">
				<div class="card-content">
					{{event.description}}
				</div>
			</div>
		</div>

  </div>
</template>

<script>
export default {
  data() {
    return {
      date: new Date(),
      allEvents: [],
      shownEvents: [],
      eventsByMonth: null,
      eventsByDay: null,
      event: {
        date: null,
        description: null,
        color: null,
        icon: null,
      },

    };
  },

  methods: {

    changeDate (date) {

      this.event.date = date;

      const month = date.getMonth();
      const day = date.getDate();

      let events = this.getEvents(day, month);
      this.shownEvents = events;

    },

    getEvents (day, month) {

      let events = [];
      if(!this.eventsByMonth.has(month)){
        return [];
      }

      let montlyEvents = this.eventsByMonth.get(month);
      for(var entry of montlyEvents.entries()){
        if(entry[0] == day){
          events = entry[1];
        }
      }
  
      return events;

    },

    createEvent () {

      let month = this.event.date.getMonth();
      let day = this.event.date.getDate();

      if(!this.eventsByMonth.has(month)){
        this.eventsByMonth.set(month, new Map());
      }

      let monthlyMap = this.eventsByMonth.get(month);
      let dailyEvents = new Array();
      if(!monthlyMap.has(day)){
        monthlyMap.set(day, dailyEvents);
      }
      dailyEvents = monthlyMap.get(day);

      const newEvent = this.event;
      dailyEvents.push(newEvent);
      this.shownEvents.push(newEvent);
      
      this.event = {
        description: null,
        date: new Date(),
        color: null,
        icon: null
      }

    },

  },
  created () {

    if(this.eventsByMonth == null){
      this.eventsByMonth = new Map();
    }

    if(this.eventsByYear == null){
      this.eventsByYear = new Map();
    }

    this.event.date = new Date();

  },
};
</script>

<style>
</style>