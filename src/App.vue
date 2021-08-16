<template>
  <div>

    <Notes></Notes> 
    <!-- <Todo></Todo> -->

  </div>
</template>

<script>

export default {

  name: 'App',
  components: {
    // Todo : () => import('./components/Todo'),
    Notes: () => import('./components/Notes.vue')
  }
}

</script>

<style>

</style>
