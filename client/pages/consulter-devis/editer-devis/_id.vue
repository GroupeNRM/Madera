<template>
  <div>
    <MainTitle>
      <span slot="first-line">Editer un</span>
      <span slot="second-line">devis</span>
    </MainTitle>

    <form class="form-container">
      <div class="columns is-multiline">
        <!-- TODO : Script pour récupérer les projets de la BDD + Afficher (Liste avec recherche texte si possible) -->
        <b-field label="Projet" class="column is-half">
          <b-select
            placeholder="Sélectionner un projet"
            v-on:input=""
            expanded
          >
            <option>Projet - Parc de la Chartreuse</option>
            <option>Projet - Parc des Pyrénées</option>
            <option>Projet - Parc des Ardennes</option>
          </b-select>
        </b-field>

        <!-- TODO : Script pour récupérer les clients de la BDD + Afficher (Liste avec recherche texte si possible) -->
        <b-field label="Client" class="column is-half">
          <b-select
            placeholder="Selectionner un client"
            expanded
          >
            <option>Mairie de Grenoble</option>
            <option>Ville de Lyon</option>
            <option>Annecy Vision</option>
            <option>M. John</option>
            <option>Mme. Jane</option>
          </b-select>
        </b-field>

        <b-field label="Référence devis" class="column is-full">
          <b-input
            v-model="inputReference"
            placeholder="Saisir la référence du devis"
            expanded
          >
          </b-input>
        </b-field>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  head(){
    return {
      title: "Editer un devis",
      meta: [
        {
          hid: "description",
          content: "Page permettant d'éditer les données d'un devis."
        }
      ]
    }
  },
  data(){
    return {
      devisData: [],
      inputProjet: undefined,
      inputClient: undefined,
      inputReference: undefined,

      validationFields: {
        projet: {
          status: "",
          message: "Merci de sélectionner un projet"
        },
        client: {
          status: "",
          message: "Merci de sélectionner votre client"
        },
        reference: {
          status: "",
          message: "Merci de saisir une reference"
        },
        echelonnement: {
          status: "",
          message: "Merci de sélectionner un echelonnement"
        }
      }
    }
  },
  async fetch() {
    this.devisData = await this.$axios.$get(`http://localhost:3000/devis/${this.$route.params.id}`);
    this.inputProjet = this.devisData.projet;
    this.inputClient = this.devisData.client;
    this.inputReference = this.devisData.reference;
    console.log(this.devisData);
  }
}
</script>

<style scoped>

</style>
