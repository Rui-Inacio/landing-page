<template>
  <div>

    <Notes></Notes> 
    <Todo></Todo>

  </div>
</template>

<script>

require('dotenv').config()

export default {

  name: 'App',
  components: {
    Notes: () => import('./components/Notes.vue')
    Todo : () => import('./components/TodoList/Todo')
  }
}

</script>

<style>

</style>
