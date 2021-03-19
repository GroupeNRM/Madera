<template>
  <section class="is-fullheight">
    <div class="columns is-fullheight mt-0">
      <Sidebar/>
      <div class="column is-10 section is-poppins">
        <div class="">
          <b-button type="is-success" class="ml-auto mr-6 is-block">Créer une nouvelle gamme</b-button>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "gammes",
  middleware: 'admin-access',
  layout: 'dashboard'
}
</script>

<style scoped>
  .ml-auto {
    margin-left: auto;
  }
</style>
