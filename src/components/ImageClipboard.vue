<template>
  <div>
    <div class="imageInput" id="imageDiv" contenteditable="true" @keypress.enter.prevent="downloadImages" @paste="onPaste"></div>
    <b-button class="primary" @click="downloadImages">Download</b-button>
    <!-- <div v-if="images.length">
      <img v-for="image in images" :key="image" :src="image" alt="snippet">
    </div> -->
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
    };
  },

  methods: {
    
     onPaste () {

      var imageInDiv = document.getElementById('imageDiv');
      var images = imageInDiv.getElementsByTagName('img');

      this.sleep(10).then( () => {
        this.images = [];
        images.forEach(image => {
          console.log(image);
          this.images.push(image.currentSrc);
        })
      })

    },

    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },

    downloadImages () {

      if(this.images.length > 0){

        var a = document.createElement('a');
        this.images.forEach(image => {

          let name =  Math.random().toString(36).substring(2,7);
          a.href = image;
          a.download = name + '.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

        })

      }
      
    }

  },

};
</script>

<style>

  .imageInput {
    border-color: tomato;
    height: 5rem;
  }

</style>
