<template>
  <div class="container mb-6">
    <b-navbar class="is-spaced">
      <template #brand>
        <b-navbar-item tag="router-link" :to="{ path: '/' }">
          <img
            src="~assets/logo_madera.svg"
            alt="The Madera Logo!"
          >
        </b-navbar-item>
      </template>

      <template #end>
        <NuxtLink to="/creer-projet" class="navbar-item">Créer un projet</NuxtLink>

        <b-navbar-item href="#">
          Créer un devis
        </b-navbar-item>
        <NuxtLink to="/consulter-projet" class="navbar-item">Consulter les projets</NuxtLink>
        <b-navbar-item href="#">
          Consulter les devis
        </b-navbar-item>
      </template>
    </b-navbar>
  </div>
</template>

<script>

export default {
  name: "Header"
}
</script>

<style scoped>

</style>
