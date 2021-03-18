<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <h1 class="is-size-1" v-if="error.statusCode === 404">
          404
        </h1>
        <h1 v-else>An error occurred</h1>
        <img src="~assets/img/404.svg" alt="">
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "error",
  props: ['error'],
  layout: 'error' // Custom layout if needed
}
</script>

<style scoped>

</style>
