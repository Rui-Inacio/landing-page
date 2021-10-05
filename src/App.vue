<template>
  <div>

    <Schedule></Schedule>
    <Notes></Notes> 
    <Todo></Todo>

  </div>
</template>

<script>

require('dotenv').config()

export default {

  name: 'App',
  components: {
    Schedule: () => import('./components/Schedule.vue')
    Notes: () => import('./components/Notes.vue')
    Todo : () => import('./components/TodoList/Todo')
  }
}

</script>

<style>

</style>
