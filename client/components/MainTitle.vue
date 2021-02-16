<template>
  <div class="main-title pb-6">
    <div class="is-block">
      <slot name="first-line"></slot>
    </div>

    <div class="colored-text is-block">
      <slot name="second-line"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainTitle"
}
</script>

<style scoped>

</style>
