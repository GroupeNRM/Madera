<template>
  <div>
    <MainTitle>
      <span slot="first-line">Consulter le</span>
      <span slot="second-line">projet n°{{this.$route.params.id}}</span>
    </MainTitle>
    <p v-if="$fetchState.pending">Fetching project...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <div class="main-content mb-6">
        <ul class="info-project mb-3">
          <li>{{ projectData.client }}</li>
          <li>Projet : <span class="has-text-primary">{{ projectData.libelle }}</span></li>
          <li>{{ projectData.devis }}</li>
        </ul>

        <div>
          <b-button class="pl-6 pr-6 mr-5" type="is-primary" outlined>Editer</b-button>
          <b-button class="pl-6 pr-6" type="is-danger" @click="confirmArchive">Archiver</b-button>
        </div>
      </div>

      <h3>Plus d'informations</h3>
      <div class="columns">
        <div class="column">
          <InfoCard icon="calendar-outline">
            <span slot="text-data">{{projectData.dateCreation}}</span>
          </InfoCard>
        </div>
        <div class="column">
          <InfoCard icon="account-outline">
            <span slot="text-data">{{projectData.client}}</span>
          </InfoCard>
        </div>
        <div class="column">
          <InfoCard icon="map-marker-outline">
            <span slot="text-data">{{projectData.client}}</span>
          </InfoCard>
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
      projectData: []
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
        onConfirm: () => this.$buefy.toast.open('Account deleted!')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .info-project {
    font-family: "Poppins", serif;
    font-weight: bold;

    &:first-child {
      font-size: 40px;
    }

    li:not(:first-child) {
      font-size: 28px;
    }
  }

  h3 {
    font-family: "Poppins", serif;
    font-weight: bold;
    font-size: 45px;
  }
</style>
