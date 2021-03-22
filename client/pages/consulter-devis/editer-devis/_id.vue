<template>
  <div>
    <MainTitle>
      <span slot="first-line">Editer un</span>
      <span slot="second-line">devis</span>
    </MainTitle>

    <form class="form-container">
      <div class="columns is-multiline">
        <b-field label="Projet" class="column is-half" :type="validationFields.projet.status" :message="validationFields.projet.status === 'is-danger' ? validationFields.projet.message : ''">
          <b-select
            v-model="formData.selectProjet"
            placeholder="Sélectionner un projet"
            v-on:input=""
            expanded
          >
            <option>Projet - Parc de la Chartreuse</option>
            <option>Projet - Parc des Pyrénées</option>
            <option>Projet - Parc des Ardennes</option>
          </b-select>
        </b-field>

        <b-field label="Client" class="column is-half" :type="validationFields.client.status" :message="validationFields.client.status === 'is-danger' ? validationFields.client.message : ''">
          <b-select
            v-model="formData.selectClient"
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

        <b-field label="Référence devis" class="column is-full" :type="validationFields.reference.status" :message="validationFields.reference.status === 'is-danger' ? validationFields.reference.message : ''">
          <b-input
            v-model="formData.inputReference"
            placeholder="Saisir la référence du devis"
            expanded
          >
          </b-input>
        </b-field>

        <b-field label="Mettre à jour l'échelonnement" class="column is-full" :type="validationFields.echelonnement.status" :message="validationFields.echelonnement.status === 'is-danger' ? validationFields.echelonnement.message : ''">
          <b-select
            v-model="formData.selectEchelonnement"
            placeholder="Sélectionner un échelonnement"
            expanded
          >
            <option>3%</option>
            <option>10%</option>
            <option>15%</option>
            <option>25%</option>
            <option>40%</option>
            <option>75%</option>
            <option>95%</option>
            <option>100%</option>
          </b-select>
        </b-field>

        <div class="column is-full has-text-centered">
          <b-button type="is-info" v-on:click="sendData" outlined>Mettre à jour</b-button>
        </div>
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

      formData: {
        inputDate: new Date(),
        selectProjet: undefined,
        selectClient: undefined,
        inputReference: undefined,
        selectEchelonnement: undefined
      },

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
  methods: {
    sendData: async function() {
      !this.formData.selectClient ? this.validationFields.client.status = "is-danger" : this.validationFields.client.status = "is-success";
      !this.formData.selectProjet ? this.validationFields.projet.status = "is-danger" : this.validationFields.projet.status = "is-success";
      !this.formData.selectEchelonnement ? this.validationFields.echelonnement.status = "is-danger" : this.validationFields.echelonnement.status = "is-success";
      !this.formData.inputReference ? this.validationFields.reference.status = "is-danger" : this.validationFields.reference.status = "is-success";

      if(!(this.validationFields.projet.status === "is-danger" || this.validationFields.client.status === "is-danger" || this.validationFields.reference.status === "is-danger" || this.validationFields.echelonnement.status === "is-danger")){
        this.$nuxt.$loading.start();

        await this.$axios.$patch(`http://localhost:3000/devis/update-devis/${this.$route.params.id}`, {
          "projet": this.formData.selectProjet,
          "client": this.formData.selectClient,
          "reference": this.formData.inputReference,
          "echelonnement": this.formData.selectEchelonnement
        })
        .then(({id}) => {
          this.$buefy.notification.open({
            message: 'Le devis a bien été modifié !',
            type: 'is-success',
            duration: 3000,
            closable: false,
            autoClose: true
          });

          this.$nuxt.$loading.finish();
          this.$router.push(`/consulter-devis/${id}`);
        })
        .catch((err) => {
          this.$buefy.notification.open({
            message: 'Une erreur est survenue, veuillez réessayer plus tard.',
            type: 'is-danger',
            duration: 3000,
            closable: false,
            autoClose: true
          });

          console.log(err);
          this.$nuxt.$loading.finish();
        });
      }
    }
  },
  async fetch() {
    this.devisData = await this.$axios.$get(`http://localhost:3000/devis/${this.$route.params.id}`);
    this.formData.selectProjet = this.devisData.projet;
    this.formData.selectClient = this.devisData.client;
    this.formData.inputReference = this.devisData.reference;
    this.formData.selectEchelonnement = this.devisData.echelonnement;
  }
}
</script>

<style scoped>

</style>
