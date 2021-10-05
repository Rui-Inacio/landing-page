<template>
  <div>

    <Todo></Todo>

  </div>
</template>

<script>

require('dotenv').config()

export default {

  name: 'App',
  components: {
    Todo : () => import('./components/TodoList/Todo')
  }
}

</script>

<style>

</style>
