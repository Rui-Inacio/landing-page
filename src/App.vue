<template>
  <div>

    <Todo></Todo>

  </div>
</template>

<script>

export default {

  name: 'App',
  components: {
    Todo : () => import('./components/Todo')
  }
}

</script>

<style>

</style>
