<template>
  <!-- TODO: Edit time of event -->
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

      <form action="#" @submit.prevent="createEvent(event)">
        <b-field grouped>
          <b-input expanded v-model="event.description"></b-input>
          <b-button @click="createEvent(event)" icon-left="calendar-plus" :disabled="!event.description">
            Add Event
          </b-button>
        </b-field>
      </form>
        
      <div class="card mb-5" v-for="(event, index) in shownEvents" :key="index">
        <div class="card-header">
          <h3 class="is-size-5">{{event.time}}</h3>
          <div class="buttons is-pulled-right">
            <b-button @click="cancelEdit(event, index)" rounded size="is-small">
              <b-icon icon="pencil"></b-icon>
            </b-button>
            <b-button @click="deleteEvent(event)" rounded size="is-small">
              <b-icon icon="delete"></b-icon>
            </b-button>
          </div>
        </div>

        <div class="card-content">
          <div v-if="editingEvent != index">
            {{ event.description }}
          </div>
          <div v-if="editingEvent == index">
            <form action="#" @submit.prevent="updateEvent(event)">
              <b-field grouped>
                <b-timepicker v-if="turnedSwitch == 'Custom Time'" size="is-small" v-model="event.time" inline></b-timepicker>
                <b-switch v-model="turnedSwitch" true-value="All Day" false-value="Custom Time">
                  {{ turnedSwitch }}
                </b-switch>
              </b-field>
              <b-field group-multiline>
                <b-input v-model="event.description"></b-input>
                <b-button icon-left="check" class="is-success" @click="updateEvent(event)">
                  Save
                </b-button>
                <b-button @click="cancelEdit(event, index, true)" icon-left="close" class="is-danger">
                  Cancel
                </b-button>
              </b-field>
            </form>
          </div>
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
      eventToEdit: null,
      turnedSwitch: "All Day",
      editingEvent: null
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

      if(!this.event.description){
        return;
      }

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

    updateEvent(event) {

      if(!event.description){
        return;
      }

      let date = event.date;
      let day = date.getDate();
      let month = date.getMonth();

      let events = this.getEvents(day, month);
      let eventToEdit = events.find(element => element == event);
      eventToEdit = event;
      this.editingEvent = null;
      return eventToEdit;

    },

    deleteEvent(event){
      
      let date = event.date;
      let month = date.getMonth();
      let day = date.getDate();

      let events = this.getEvents(day, month);
      let index = events.findIndex(element => element == event);
      events.splice(index, 1);

      index = this.allEvents.findIndex(element => element == event);
      this.allEvents.splice(index, 1);

    },

    cancelEdit(event, index, cancel = false){



      if(cancel == false){
        this.eventToEdit = Object.assign({}, event);
      }

      if(this.editingEvent == index){
        this.editingEvent = null;
      }else{
        this.editingEvent = index;
      }

      console.log("Start");
      console.log("Index = ", index);
      this.shownEvents[index] = Object.assign({}, this.eventToEdit);

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

  input:invalid {
    box-shadow: none;
  }

</style>