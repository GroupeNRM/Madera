<template>
  <div class="info-card pl-4">
    <p>
      <b-icon class="is-vertically-aligned pr-3 is-inline" :icon="icon" size="is-medium"></b-icon>
      <slot name="text-data"></slot>
    </p>
  </div>
</template>

<script>
export default {
  name: "InfoCard",
  props: {
    icon: String
  }
}
</script>

<style lang="scss" scoped>
  @import "assets/scss/variables";

  .is-vertically-aligned {
    vertical-align: middle;
  }

  .info-card {
    font-family: "Roboto", serif;

    border-left: 10px solid $primary;
    border-top: 1px solid $light-grey;
    border-right: 1px solid $light-grey;
    border-bottom: 1px solid $light-grey;

    box-shadow: 0 2px 2px rgba(0, 0, 0, 0.25);
    border-radius: 5px;

    height: 65px;
    line-height: 61px;
  }
</style>
