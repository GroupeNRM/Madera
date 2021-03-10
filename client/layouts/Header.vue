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
        <NuxtLink to="/creer-devis" class="navbar-item">Créer un devis</NuxtLink>
        <NuxtLink to="/consulter-projet" class="navbar-item">Consulter les projets</NuxtLink>
        <NuxtLink to="/consulter-devis" class="navbar-item">Consulter les devis</NuxtLink>
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
