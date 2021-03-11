<template>
  <div>
    <div>
      <div class="main-content mb-6">
        <MainTitle>
          <span slot="first-line">Consulter tous</span>
          <span slot="second-line">les devis</span>
        </MainTitle>

        <div class="columns is-multiline">
          <Card v-for="devis in devisData" :key="devis.client" :data="devis"></Card>
          
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
      devisCount: undefined
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
