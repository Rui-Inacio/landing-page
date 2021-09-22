<template>
  <div>

    <!-- <Todo></Todo> -->
    <Schedule></Schedule>

  </div>
</template>

<script>

export default {

  name: 'App',
  components: {
    Schedule: () => import('./components/Schedule.vue')
    // Todo : () => import('./components/Todo')
  }
}

</script>

<style>

</style>
