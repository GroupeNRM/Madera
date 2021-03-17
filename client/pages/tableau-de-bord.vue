<template>
  <section class="is-fullheight">
    <div class="columns is-fullheight mt-0">
      <Sidebar/>
      <div class="column is-9 section">
        <h1 class="is-size-1 is-poppins has-text-weight-bold">Tableau de bord</h1>
        <div class="columns">
          <div class="column is-3">First</div>
          <div class="column is-3">Second</div>
          <div class="column is-3">Third</div>
          <div class="column is-3">Fourth</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "tableau-de-bord",
  middleware: 'admin-access',
  layout: 'dashboard',
  data() {
    return {
      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false
    };
  },
  mounted() {

  }
};
</script>

<style lang="scss" scoped>
  section {
    min-height: 100vh;
  }

  .is-poppins {
    color: #2F2C37;
    font-family: 'Varela Round', sans-serif;
  }
</style>
