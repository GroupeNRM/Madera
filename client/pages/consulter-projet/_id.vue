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
          <b-button class="pl-6 pr-6" type="is-danger">Archiver</b-button>
        </div>
      </div>


      <div class="columns">
        <div class="column">
          <InfoCard icon="calendar">
            <span slot="text-data">{{projectData.dateCreation}}</span>
          </InfoCard>
        </div>
        <div class="column">
          Second column
        </div>
        <div class="column">
          Third column
        </div>
        <div class="column">
          Fourth column
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
</style>
