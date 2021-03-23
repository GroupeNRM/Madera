<template>
  <div>
    <MainTitle>
      <span slot="first-line">Editer un</span>
      <span slot="second-line">devis</span>
    </MainTitle>

    <form class="form-container">
      <div class="columns is-multiline">
        <b-field label="Mettre à jour l'échelonnement" class="column is-half" :type="validationFields.echelonnement.status" :message="validationFields.echelonnement.status === 'is-danger' ? validationFields.echelonnement.message : ''">
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

        <b-field label="Référence devis" class="column is-half" :type="validationFields.reference.status" :message="validationFields.reference.status === 'is-danger' ? validationFields.reference.message : ''">
          <b-input
            v-model="formData.inputReference"
            placeholder="Saisir la référence du devis"
            expanded
          >
          </b-input>
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

      listingProjet: [],

      validationFields: {
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
      !this.formData.selectEchelonnement ? this.validationFields.echelonnement.status = "is-danger" : this.validationFields.echelonnement.status = "is-success";
      !this.formData.inputReference ? this.validationFields.reference.status = "is-danger" : this.validationFields.reference.status = "is-success";

      if(!(this.validationFields.reference.status === "is-danger" || this.validationFields.echelonnement.status === "is-danger")){
        this.$nuxt.$loading.start();

        await this.$axios.$patch(`http://localhost:3000/devis/update-devis/${this.$route.params.id}`, {
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
