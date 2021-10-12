<template>
  <div>

    <Notes></Notes>

  </div>
</template>

<script>

export default {

  name: 'App',
  components: {
    // ImageClipboard: () => import('./components/ImageClipboard'),
    // Schedule: () => import('./components/Schedule.vue'),
    Notes: () => import('./components/Notes.vue'),
    // Todo : () => import('./components/TodoList/Todo'),
    // Weather: () => import('./components/Weather.vue')
  },

  created () {
    console.log("process", process.env);
  }
}

</script>

<style>

</style>
