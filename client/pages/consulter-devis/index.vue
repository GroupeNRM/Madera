<template>
  <div>
    <section>
      <!--
      <p class="content"><b>Rechercher un devis</b> {{ selected }}</p>
      <b-field>
          <b-autocomplete
              rounded
              v-model="name"
              :data="filteredDataArray"
              placeholder="Tapez la référence du devis..."
              icon="magnify"
              clearable
              @select="option => selected = option">
              <template #empty>No results found</template>
          </b-autocomplete>
      </b-field>
      -->
    </section>
    <div>
      <div class="main-content mb-6">
        <MainTitle>
          <span slot="first-line">Consulter tous</span>
          <span slot="second-line">les devis</span>
        </MainTitle>

        <div class="columns is-multiline">
          <CardDevis v-for="devis in devisData" :key="devis.id" :data="devis"></CardDevis>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "index",
  head() {
    return {
      title: "Consulter les devis",
      meta: [
        {
          hid: "description",
          content: "Page permettant de consulter les devis"
        }
      ]
    }
  },
  data() {
    return {
      devisData: [],
      devisCount: undefined,
      data: [],
      computed: {
        /*filteredDataArray() {
            return this.data.filter((option) => {
                return option
                    .toString()
                    .toLowerCase()
                    .indexOf(this.name.toLowerCase()) >= 0
            })
          }
        */},
        name: '',
        selected: null
      }
  },
  async fetch() {
    let devisList = await this.$axios.$get(`http://localhost:3000/devis`);
    this.devisData = devisList[0];
    this.devisCount = devisList[1];
  }
}
</script>

<style scoped>

</style>
