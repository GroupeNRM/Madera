<template>
  <div>
    <div>
      <div class="main-content mb-6">
        <MainTitle>
          <span slot="first-line">Consulter tous</span>
          <span slot="second-line">les projets</span>
        </MainTitle>

        <div class="columns is-multiline">
          <Card v-for="project in projects" :key="project.id" :data="project"></Card>
   
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
      title: "Consulter les projets",
      meta: [
        {
          hid: "description",
          content: "Page permettant de consulter les projets"
        }
      ]
    }
  },
  data() {
    return {
      projects: [],
      projectCount: undefined
    }
  },
  async fetch() {
    let projectsList = await this.$axios.$get(`http://localhost:3000/project`);
    this.projects = projectsList[0];
    this.projectCount = projectsList[1];
  }
}
</script>

<style scoped>

</style>
