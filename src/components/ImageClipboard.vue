<template>
  <div class="container">
    <div class="imageInput" id="imageDiv" contenteditable="true" @keypress.enter.prevent="downloadImages" @paste="onPaste"></div>
    <b-button class="primary" @click="downloadImages">Download</b-button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      images: [],
      imageNodes: [],
    };
  },

  methods: {
    
     onPaste () {

      var imageInDiv = document.getElementById('imageDiv');
      var images = imageInDiv.getElementsByTagName('img');
      this.imageNodes = images;

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

        // TODO: Check if image src is the same, if so use same name or only download once

        var a = document.createElement('a');
        this.images.forEach(image => {

          let name =  Math.random().toString(36).substring(2,7);
          a.href = image;
          a.download = name + '.png';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);

        })

        this.imageNodes.forEach(image => {
          image.remove();
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
