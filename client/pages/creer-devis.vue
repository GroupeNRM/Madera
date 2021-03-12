<!--There are some Vue warn about type check error in the logs, it's just a dev bug : https://github.com/buefy/nuxt-buefy/issues/36 -->

<template>
  <div>
    <MainTitle>
      <span slot="first-line">Créer un</span>
      <span slot="second-line">nouveau devis</span>
    </MainTitle>

    <form class="form-container">
      <div class="columns is-multiline">
        <b-field label="Date de création" class="column is-half" :type="validationFields.date.status" :message="validationFields.date.status === 'is-danger' ? validationFields.date.message : ''">
          <b-datepicker
            v-model="inputDate"
            :show-week-number="showWeekNumber"
            :locale="localeDate"
            v-on:input="validationFields.date.status = ''"
            icon="calendar-today"
            trap-focus>
          </b-datepicker>
        </b-field>

        <!-- TODO : Script pour récupérer les projets de la BDD + Afficher (Liste avec recherche texte si possible) -->
        <b-field label="Projet" class="column is-half" :type="validationFields.projet.status" :message="validationFields.projet.status === 'is-danger' ? validationFields.projet.message : ''">
          <b-select
            placeholder="Selectionner un projet"
            v-model="inputProjet"
            v-on:input="validationFields.projet.status = ''"
            expanded>
            <option>Projet - Parc de la Chartreuse</option>
            <option>Projet - Parc des Pyrénées</option>
            <option>Projet - Parc des Ardennes</option>
          </b-select>
        </b-field>

        <!-- TODO : Script pour récupérer les clients de la BDD + Afficher (Liste avec recherche texte si possible) -->
        <b-field label="Client" class="column is-full" :type="validationFields.client.status" :message="validationFields.client.status === 'is-danger' ? validationFields.client.message : ''">
          <b-select
            placeholder="Selectionner un client"
            v-model="inputClient"
            v-on:input="validationFields.client.status = ''"
            expanded>
            <option>Mairie de Grenoble</option>
            <option>Ville de Lyon</option>
            <option>Annecy Vision</option>
            <option>M. John</option>
            <option>Mme. Jane</option>
          </b-select>
        </b-field>

        <b-field label="Référence devis" class="column is-full" :type="validationFields.reference.status" :message="validationFields.reference.status === 'is-danger' ? validationFields.reference.message : ''">
          <b-input
            placeholder="Saisir la référence du devis"
            v-model="inputReference"
            v-on:input="validationFields.reference.status = ''"
            expanded>
          </b-input>
        </b-field>

        <b-field class="column is-full" label="Sélectionner une gamme">
          <div class="is-flex is-justify-content-space-between">
            <b-button type="is-large button-house" v-on:click="setGammeMaison('Urbain')" outlined><b-icon icon="home" size="is-large"></b-icon></b-button>
            <b-button type="is-large button-house" v-on:click="setGammeMaison('Nature')" outlined><b-icon icon="pine-tree" size="is-large"></b-icon></b-button>
            <b-button type="is-large button-house" v-on:click="setGammeMaison('Prestige')" outlined><b-icon icon="star" size="is-large"></b-icon></b-button>
          </div>
        </b-field>

        <b-field label="Nombre de maison" class="column is-half" :type="validationFields.nbrMaison.status" :message="validationFields.nbrMaison.status === 'is-danger' ? validationFields.nbrMaison.message : ''">
          <b-numberinput v-model="inputNbrMaison" min="1" max="10" :placeholder="0"></b-numberinput>
        </b-field>

        <b-field label="Remise" :type="validationFields.remise.status" class="column is-half">
          <b-select
            placeholder="Selectionner une remise"
            v-model="inputRemise"
            expanded>
            <option value="Aucune">Aucune</option>
            <option value="BVN">Remise BVN : -5%</option>
            <option value="PRA">Remise PRA : -10%</option>
          </b-select>
        </b-field>

        <b-field label="Prix TTC (€)" class="column" :type="validationFields.prixTTC.status" :message="validationFields.prixTTC.status === 'is-danger' ? validationFields.prixTTC.message : ''">
          <b-input
            type:="number"
            v-model="inputTotalTTC"
            v-on:input="validationFields.prixTTC.status = ''"
            expanded>
          </b-input>
          <p class="control">
            <b-button class="button is-success" v-on:click="calculPrice()" outlined>Calculer</b-button>
          </p>
        </b-field>
      </div>

      <div class="column is-full has-text-centered">
        <b-button type="is-info" v-on:click="sendData" outlined>Nouveau devis</b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "creer-devis",
  head() {
    return {
      title: "Créer un nouveau devis",
      meta: [
        {
          hid: "description",
          content: "Page permettant de créer un nouveau devis de maisons modulaires."
        }
      ]
    }
  },
  data() {
    return {
      inputDate: new Date(),
      inputProjet: undefined,
      inputClient: undefined,
      inputReference: undefined,
      inputGammeMaison: undefined,
      inputNbrMaison: 1,
      inputTotalHT: 0,
      inputTotalTTC: 0,
      inputRemise: "Aucune",
      localeDate: "fr-FR",
      showWeekNumber: false,
      echelonnement: "0%",

      validationFields: {
        date: {
          status: "",
          message: "Merci de choisir une date de création"
        },
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
        nbrMaison: {
          status: "",
          message: "Merci de saisir un nombre de maison supérieur à 0"
        },
        remise: {
          status: ""
        },
        prixTTC: {
          status: "",
          message: "Merci de calculer le prix total TTC"
        }
      }
    }
  },
  methods: {
    setGammeMaison: function(element) {
      switch(element){
        case "Urbain":
          this.inputGammeMaison = "Urbain";
          break;
        case "Nature":
          this.inputGammeMaison = "Nature";
          break;
        case "Prestige":
          this.inputGammeMaison = "Prestige";
          break;
      }
    },
    calculPrice: function (){
      switch(this.inputRemise){
        case "Aucune":
          switch(this.inputGammeMaison){
            case "Urbain":
              this.inputTotalTTC = 110000 * this.inputNbrMaison;
              break;
            case "Nature":
              this.inputTotalTTC = 125000 * this.inputNbrMaison;
              break;
            case "Prestige":
              this.inputTotalTTC = 150000 * this.inputNbrMaison;
              break;
          }
          break;
        case "BVN":
          switch(this.inputGammeMaison){
            case "Urbain":
              this.inputTotalTTC = (110000 * this.inputNbrMaison) - (110000 * this.inputNbrMaison) * 0.05;
              break;
            case "Nature":
              this.inputTotalTTC = (125000 * this.inputNbrMaison) - (125000 * this.inputNbrMaison) * 0.05;
              break;
            case "Prestige":
              this.inputTotalTTC = (150000 * this.inputNbrMaison) - (150000 * this.inputNbrMaison) * 0.05;
              break;
          }
          break;
        case "PRA":
          switch(this.inputGammeMaison){
            case "Urbain":
              this.inputTotalTTC = (110000 * this.inputNbrMaison) - (110000 * this.inputNbrMaison) * 0.1;
              break;
            case "Nature":
              this.inputTotalTTC = (125000 * this.inputNbrMaison) - (125000 * this.inputNbrMaison) * 0.1;
              break;
            case "Prestige":
              this.inputTotalTTC = (150000 * this.inputNbrMaison) - (150000 * this.inputNbrMaison) * 0.1;
              break;
          }
          break;
      }
    },
    sendData: async function() {
      !this.inputDate ? this.validationFields.date.status = "is-danger" : this.validationFields.date.status = "is-success";
      !this.inputProjet ? this.validationFields.projet.status = "is-danger" : this.validationFields.projet.status = "is-success";
      !this.inputClient ? this.validationFields.client.status = "is-danger" : this.validationFields.client.status = "is-success";
      !this.inputReference ? this.validationFields.reference.status = "is-danger" : this.validationFields.reference.status = "is-success";
      this.inputNbrMaison === 0 ? this.validationFields.nbrMaison.status = "is-danger" : this.validationFields.nbrMaison.status = "is-success";
      !this.inputRemise ? this.validationFields.remise.status = "is-danger" : this.validationFields.remise.status = "is-success";
      this.inputTotalTTC === 0 ? this.validationFields.prixTTC.status = "is-danger" : this.validationFields.prixTTC.status = "is-success";

      if(!(this.validationFields.date.status === "is-danger" || this.validationFields.projet.status === "is-danger" || this.validationFields.client.status === "is-danger" || this.validationFields.reference.status === "is-danger" || this.validationFields.nbrMaison.status === "is-danger" || this.validationFields.remise.status === "is-danger" || this.validationFields.prixTTC.status === "is-danger")){
        this.$nuxt.$loading.start();

        // Requête POST
        await this.$axios.$post('http://localhost:3000/devis', {
          "createdAt": this.inputDate,
          "projet": this.inputProjet,
          "client": this.inputClient,
          "reference": this.inputReference,
          "remise": this.inputRemise,
          "echelonnement": "0%",
          "total_ht": (this.inputTotalTTC - this.inputTotalTTC) * 0.13,
          "total_ttc": this.inputTotalTTC
        })
        .then(({id}) => {
          this.$buefy.notification.open({
            message: 'Le devis a bien été crée !',
            type: 'is-success',
            duration: 3000,
            closable: false,
            autoClose: true
          });

          this.$nuxt.$loading.finish();
          this.$router.push(`/consulter-devis/${id}`);
        }).catch((err) => {
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
  }
}
</script>

<style scoped>
  .button-house{
    width: 170px;
    height: 135px;
  }
</style>
