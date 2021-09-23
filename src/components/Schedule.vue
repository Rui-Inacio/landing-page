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
        <b-timepicker v-if="turnedSwitch == 'Custom Time'" size="is-small" v-model="event.time" inline></b-timepicker>
        <b-switch v-model="turnedSwitch" true-value="All Day" false-value="Custom Time">
          {{ turnedSwitch }}
        </b-switch>
      </b-field>

      <b-field grouped>
        <b-input expanded v-model="event.description"></b-input>
        <b-button @click="createEvent(event)" icon-left="calendar-plus">
          Add Event
        </b-button>
      </b-field>
        
      <div class="card mb-5" v-for="event in shownEvents" :key="event.description">
        <div class="card-header">
          <h3 class="is-size-5">{{event.time}}</h3>
          <div class="buttons is-pulled-right">
            <b-button rounded size="is-small">
              <b-icon icon="pencil"></b-icon>
            </b-button>
            <b-button @click="deleteEvent(event)" rounded size="is-small">
              <b-icon icon="delete"></b-icon>
            </b-button>
          </div>
        </div>
        <div class="card-content">
          {{ event.description }}
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
        time: null,
        description: null,
        color: null,
        icon: null,
      },
      turnedSwitch: "All Day",
      
    };
  },

  methods: {

    changeDate(date) {
      this.event.date = date;

      const month = date.getMonth();
      const day = date.getDate();

      let events = this.getEvents(day, month);
      this.shownEvents = events;
    },

    

    getEvents(day, month) {
      let events = [];
      if (!this.eventsByMonth.has(month)) {
        return [];
      }

      let montlyEvents = this.eventsByMonth.get(month);
      for (var entry of montlyEvents.entries()) {
        if (entry[0] == day) {
          events = entry[1];
        }
      }

      return events;
    },

    createEvent() {

      let month = this.event.date.getMonth();
      let day = this.event.date.getDate();
      if(this.event.time == null){
        this.event.time = "All Day";
      }

      if (!this.eventsByMonth.has(month)) {
        this.eventsByMonth.set(month, new Map());
      }

      let monthlyMap = this.eventsByMonth.get(month);
      let dailyEvents = new Array();
      if (!monthlyMap.has(day)) {
        monthlyMap.set(day, dailyEvents);
      }
      dailyEvents = monthlyMap.get(day);
      dailyEvents;

      const newEvent = this.event;
      dailyEvents.push(newEvent);
      this.shownEvents = dailyEvents;
      this.allEvents.push(newEvent);

      this.event = {
        description: null,
        date: this.event.date,
        time: null,
        color: null,
        icon: null,
      };
    },

    editEvent(event) {

      let date = event.date;
      let day = date.getDate();
      let month = date.getMonth();

      let events = this.getEvents(day, month);
      let eventToEdit = events.find(element => element == event);
      eventToEdit = event;
      return eventToEdit;

    },

    deleteEvent(event){
      
      let date = event.date;
      let month = date.getMonth();
      let day = date.getDate();

      let events = this.getEvents(day, month);
      let index = events.findIndex(element => element == event);
      events.splice(index, 1);

    }

  },

  created() {
    if (this.eventsByMonth == null) {
      this.eventsByMonth = new Map();
    }

    if (this.eventsByYear == null) {
      this.eventsByYear = new Map();
    }

    this.event.date = new Date();
  },

};
</script>

<style>
</style>