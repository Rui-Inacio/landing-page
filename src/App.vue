<template>
  <div :style="`background-image: url(${this.background.image})`">
    <Todo style="width:40%"></Todo>
    <!-- <Schedule></Schedule> -->
  </div>
</template>

<script>

import {saveState, loadState} from './utils/localStorage';
import axios from 'axios';

export default {

  name: "App",
  components: {
    // ImageClipboard: () => import("./components/ImageClipboard"),
    // Schedule: () => import("./components/Schedule.vue"),
    // Notes: () => import("./components/Notes.vue"),
    Todo: () => import("./components/TodoList/Todo"),
    // Weather: () => import("./components/Weather.vue"),
  },

  data() {
    return {

      viewportwidth: null,
      viewportheight: null,
      background: {
        url: '',
        image: '',
      },

      element: null,
      pos1: null,
      pos2: null,
      pos3: null,
      pos4: null,

      state: null,

    };
  },

  methods: {

    logFunction(data) {
      console.log("Got here", data);
    },

    dragElement(elmnt) {
      console.log(elmnt);
      elmnt = document.getElementById(elmnt);
      console.log(elmnt);
      this.element = elmnt;
      this.pos1 = this.pos2 = this.pos3 = this.pos4 = 0;
      if (document.getElementById(elmnt.id + "header")) {
        // if present, the header is where you move the DIV from:
        document.getElementById(elmnt.id + "header").onmousedown =
          this.dragMouseDown;
      } else {
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = this.dragMouseDown;
      }
    },

    dragMouseDown(e) {
      e = e || window.event;
      e.preventDefault();
      // get the mouse cursor position at startup:
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      document.onmouseup = this.closeDragElement;
      // call a function whenever the cursor moves:
      document.onmousemove = this.elementDrag;
    },

    elementDrag(e) {
      e = e || window.event;
      e.preventDefault();
      // calculate the new cursor position:
      this.pos1 = this.pos3 - e.clientX;
      this.pos2 = this.pos4 - e.clientY;
      this.pos3 = e.clientX;
      this.pos4 = e.clientY;
      // set the element's new position:
      this.element.style.top = this.element.offsetTop - this.pos2 + "px";
      this.element.style.left = this.element.offsetLeft - this.pos1 + "px";
    },

    closeDragElement() {
      // stop moving when mouse button is released:
      document.onmouseup = null;
      document.onmousemove = null;
    },

    getWindowSize(){

      if (typeof window.innerWidth != "undefined") {
      (this.viewportwidth = window.innerWidth),
        (this.viewportheight = window.innerHeight);
      }

      // IE6 in standards compliant mode (i.e. with a valid doctype as the first line in the document)
      else if (
        typeof document.documentElement != "undefined" &&
        typeof document.documentElement.clientWidth != "undefined" &&
        document.documentElement.clientWidth != 0
      ) {
        (this.viewportwidth = document.documentElement.clientWidth),
          (this.viewportheight = document.documentElement.clientHeight);
      }

      // older versions of IE
      else {
        (this.viewportwidth =
          document.getElementsByTagName("body")[0].clientWidth),
          (this.viewportheight =
            document.getElementsByTagName("body")[0].clientHeight);
      }

    },

    async getBackgroundImage(){

      this.background.date = new Date();
      
      this.background.url = `https://source.unsplash.com/random/${this.viewportwidth}x${this.viewportheight}`;
      let response = await axios.get(`https://source.unsplash.com/random/${this.viewportwidth}x${this.viewportheight}`, {responseType: 'blob'});

      var imageDataUrl;
      var reader = new window.FileReader();
      reader.readAsDataURL(response.data); 
      reader.onload = () => {
        imageDataUrl = reader.result;
        this.background.image = imageDataUrl;
        this.state.background = this.background
        let state = JSON.stringify(this.state)
        saveState('app-state', state);
      }

    }

  },

  async created() {

    let state = loadState('app-state');
    this.state = JSON.parse(state);
    
    if(!this.state.background || !this.state.background.image || new Date(this.state.background.date).getDate() != new Date().getDate()){

      this.getWindowSize();
      await this.getBackgroundImage();

      this.state = {
        viewportwidth: this.viewportwidth,
        viewportheight: this.viewportheight,
        background: this.background
      }

      let stateToSave = JSON.stringify(this.state);
      saveState('app-state', stateToSave);

    }else{
      this.background = this.state.background;
    }

  },
};
</script>

<style scoped>
.draggable {
  position: absolute;
  width: 50%;
}
</style>