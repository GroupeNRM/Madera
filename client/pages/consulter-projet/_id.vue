<template>
  <div>
    <p v-if="$fetchState.pending">Fetching project...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <div class="main-content mb-6">
        <div class="columns is-multiline">
          <div class="column">
            <NuxtLink to="/consulter-projet" class="backmenu-link is-size-2 has-text-weight-bold"><b-icon class="pr-5" icon="arrow-left" size="is-small"></b-icon>Revenir aux projets</NuxtLink>
            <MainTitle>
              <span slot="first-line">Consulter le</span>
              <span slot="second-line">projet n°{{this.$route.params.id}}</span>
            </MainTitle>

            <ul class="info-project mb-3">
              <li>{{projectData.client.firstName}} {{ projectData.client.lastName }}</li>
              <li>Projet : <span class="has-text-primary">{{ projectData.libelle }}</span></li>
            </ul>

            <div>
              <b-button class="pl-6 pr-6 mr-5" type="is-primary" outlined>Editer</b-button>
              <b-button class="pl-6 pr-6" type="is-danger" @click="confirmArchive" :disabled="!projectData.isActive">Archiver</b-button>
            </div>
          </div>
          <div class="column is-0-tablet-only">
            <figure class="is-inline-block">
              <img src="~assets/img/modular_house.png" alt="Plan de la maison modulaire" class="image">
            </figure>
          </div>
        </div>
      </div>

      <div class="pt-6">
        <h3 class="has-text-weight-bold">Plus d'informations</h3>
        <div class="columns">
          <div class="column">
            <InfoCard icon="calendar-outline">
              <span slot="text-data">{{projectData.dateCreation}}</span>
            </InfoCard>
          </div>
          <div class="column">
            <InfoCard icon="account-outline">
              <span slot="text-data">{{projectData.client.email}}</span>
            </InfoCard>
          </div>
          <div class="column">
            <InfoCard icon="map-marker-outline">
              <span slot="text-data">{{projectData.client.city}}</span>
            </InfoCard>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Visualiser un projet",
      meta: [
        {
          hid: "description",
          content: "Page permettant de visualiser les données d'un projet"
        }
      ]
    }
  },
  data() {
    return {
      projectData: [],
      isNotificationOpen: false,
      notificationType: "is-danger",
      notificationMessage: "Une erreur est survenue, veuillez réessayer plus tard."
    }
  },
  async fetch() {
    this.projectData = await this.$axios.$get(`http://localhost:3000/project/${this.$route.params.id}`);
    console.log(this.projectData)
  },
  methods: {
    confirmArchive() {
      this.$buefy.dialog.confirm({
        title: 'Archivage du projet',
        message: 'Êtes vous certain de vouloir archiver le projet ? Aucune modification ne sera possible.',
        confirmText: 'Confirmer',
        cancelText: 'Annuler',
        type: 'is-danger',
        hasIcon: true,
        onConfirm: async () => {
          this.$nuxt.$loading.start();
          await this.$axios.put(`http://localhost:3000/project/${this.$route.params.id}`)
            .then(() => {
              this.projectData.isActive = false;
              this.$buefy.notification.open({
                message: 'Le projet a bien été archivé !',
                type: 'is-success',
                duration: 3000,
                closable: false,
                autoClose: true
              })
              this.$nuxt.$loading.finish();
            })
            .catch(() => {
              this.$buefy.notification.open({
                message: 'Une erreur est survenue, veuillez réessayer plus tard.',
                type: 'is-danger',
                duration: 3000,
                closable: false,
                autoClose: true
              })
              this.$nuxt.$loading.finish();
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .info-project {
    font-family: "Poppins", serif;
    font-weight: bold;

    li:first-child {
      font-size: 40px;
    }

    li:not(:first-child) {
      font-size: 28px;
    }

    li {
      span {
        word-break: break-word;
      }
    }
  }

  h3 {
    font-family: "Poppins", serif;
    font-size: 45px;
  }
</style>
