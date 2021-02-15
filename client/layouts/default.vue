<template>
  <div>
    <Header/>
    <div class="container">
      <nuxt />
    </div>
  </div>
</template>

<script>
import Header from "~/layouts/Header";
export default {
  components: {Header}
}
</script>
