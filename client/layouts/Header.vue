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

      <template #end v-if="isAuthenticated">
        <NuxtLink to="/creer-client" class="navbar-item">Créer un client</NuxtLink>
        <NuxtLink to="/creer-projet" class="navbar-item">Créer un projet</NuxtLink>
        <NuxtLink to="/creer-devis" class="navbar-item">Créer un devis</NuxtLink>

        <b-dropdown
          position="is-bottom-left"
          append-to-body
          aria-role="menu">
          <template #trigger>
            <a
              class="navbar-item"
              role="button">
              <figure class="image pr-2">
                <img class="is-rounded user-picture" src="https://thumbs.dreamstime.com/b/person-gray-photo-placeholder-girl-material-design-person-gray-photo-placeholder-woman-shirt-white-background-138823268.jpg" height="25" width="25" alt="User profile picture">
              </figure>
              <b>{{loggedInUser.firstName}} {{loggedInUser.lastName}}</b>
              <b-icon icon="menu-down"></b-icon>
            </a>
          </template>

          <b-dropdown-item value="dashboard" has-link aria-role="menuitem">
            <NuxtLink to="/tableau-de-bord">
              <b-icon icon="home"></b-icon>
              Tableau de bord
            </NuxtLink>
          </b-dropdown-item>
          <b-dropdown-item value="products" has-link aria-role="menuitem">
            <NuxtLink to="/tableau-de-bord/gammes">
              <b-icon icon="cart"></b-icon>
              Ajouter une gamme
            </NuxtLink>
          </b-dropdown-item>
          <hr class="dropdown-divider" aria-role="menuitem">
          <b-dropdown-item value="settings">
            <b-icon icon="settings"></b-icon>
            Paramètres
          </b-dropdown-item>
          <b-dropdown-item value="logout" aria-role="menuitem" @click="logout">
            <b-icon icon="logout"></b-icon>
            Déconnexion
          </b-dropdown-item>
        </b-dropdown>
      </template>
    </b-navbar>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';

export default {
  name: "Header",
  computed: {
    ...mapGetters(['isAuthenticated', 'loggedInUser'])
  },
  methods: {
    async logout() {
      await this.$auth.logout();
    }
  }
}
</script>

<style lang="scss" scoped>
  .user-picture {
    max-width: 28px;
    max-height: 28px;
  }
</style>
