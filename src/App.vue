<template>
  <div>

    <!-- <Todo></Todo> -->
    <ImageClipboard></ImageClipboard>  

  </div>
</template>

<script>

export default {

  name: 'App',
  components: {
    // Todo : () => import('./components/Todo'),
    ImageClipboard: () => import('./components/ImageClipboard'),
  }
}

</script>

<style>

</style>
