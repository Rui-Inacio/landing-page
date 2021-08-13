<template>
  <div>

    <Todo></Todo>

  </div>
</template>

<script>

export default {

  name: 'App',
  components: {
    Todo : () => import('./components/TodoList/Todo')
  }
}

</script>

<style>

</style>
