<template>
  <div>
    <div class="is-fixed-top">
      <b-notification
        type="is-danger"
        aria-close-label="Close notification"
        role="alert"
        v-model="isNotificationOpen"
        position="is-top-right"
        :duration="3000"
        :auto-close="true">
        Une erreur est survenue, veuillez réessayer plus tard.
      </b-notification>
    </div>

    <MainTitle>
      <span slot="first-line">Créer un</span>
      <span slot="second-line">nouveau devis</span>
    </MainTitle>

    <form action="" class="form-container">
      <div class="columns is-multiline">
        <b-field label="Projet" class="column is-half" :type="validationFields.projet.status" :message="validationFields.projet.status === 'is-danger' ? validationFields.projet.message : ''">
          <b-select
            placeholder="Selectionner un projet"
            v-model="projet"
            v-on:input="validationFields.projet.status = ''"
            expanded>
            <option>Projet 1</option>
            <option>Projet 2</option>
            <option>Projet 3</option>
          </b-select>
        </b-field>

        <b-field label="Etat" class="column is-half" :type="validationFields.etat.status" :message="validationFields.etat.status === 'is-danger' ? validationFields.etat.message : ''">
          <b-select
            placeholder="Selectionner l'état du projet"
            v-model="etat"
            v-on:input="validationFields.etat.status = ''"
            expanded>
            <option>0%</option>
            <option>25%</option>
            <option>50%</option>
            <option>75%</option>
            <option>100%</option>
          </b-select>
        </b-field>

        <b-field label="Libellé" class="column is-half" :type="validationFields.libelle.status" :message="validationFields.libelle.status === 'is-danger' ? validationFields.libelle.message : ''">
          <b-input
            placeholder="Construction d'une maison modulaire.."
            v-on:input="validationFields.libelle.status = ''"
            v-model="libelle"
            maxlength="65">
          </b-input>
        </b-field>

        <b-field label="Date de création" class="column is-half" :type="validationFields.date.status" :message="validationFields.date.status === 'is-danger' ? validationFields.date.message : ''">
          <b-datepicker
            v-model="selectedDate"
            :locale="locale"
            v-on:input="validationFields.projet.status = ''"
            placeholder="26-12-2020"
            icon="calendar-today"
            trap-focus>
          </b-datepicker>
        </b-field>

        <b-field label="Prix Hors Taxe" class="column is-half" :type="validationFields.prix_ht.status" :message="validationFields.prix_ht.status === 'is-danger' ? validationFields.prix_ht.message : ''">
          <b-input
            placeholder="Prix HT"
            v-on:input="validationFields.prix_ht.status = ''"
            v-model.number="prix_ht"
            type = "number"
            maxlength="20">
          </b-input>
        </b-field>

        <b-field label="Echelonnement" class="column is-half" :type="validationFields.echelonnement.status" :message="validationFields.echelonnement.status === 'is-danger' ? validationFields.echelonnement.message : ''">
          <b-select
            placeholder="Selectionner l'echelonnement du projet"
            v-model="echelonnement"
            v-on:input="validationFields.echelonnement.status = ''"
            expanded>
            <option>0%</option>
            <option>25%</option>
            <option>50%</option>
            <option>75%</option>
            <option>100%</option>
          </b-select>
        </b-field>
      </div>

      <div class="column is-full has-text-centered">
        <b-button type="is-info" v-on:click="sendData" outlined>Créer le devis</b-button>
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
          content: "Page permettant de créer le devis d'un projet"
        }
      ]
    }
  },
  data() {
    return {
      selectedDate: new Date(),
      locale: "fr-FR",
      projet: undefined,
      etat: undefined,
      libelle: "",
      prix_ht:"",
      echelonnement: undefined,

      

      isNotificationOpen: false,

      validationFields: {
        projet: {
          status: "",
          message: "Merci de choisir un projet"
        },
        etat: {
          status: "",
          message: "Merci de choisir un etat"
        },
        libelle: {
          status: "",
          message: "Merci de saisir un libellé"
        },
        date: {
          status: "",
          message: "Merci de choisir une date de création"
        },
         prix_ht: {
          status: "",
          message: "Merci de sasir le prix HT"
        },
         echelonnement: {
          status: "",
          message: "Merci de selectionner l'echelonnement"
        }
      },
    }
  },
  methods: {
    sendData: async function() {

      !this.projet ? this.validationFields.projet.status = "is-danger" : this.validationFields.projet.status = "is-success";
      !this.etat ? this.validationFields.etat.status = "is-danger" : this.validationFields.etat.status = "is-success";
      !this.libelle ? this.validationFields.libelle.status = "is-danger" : this.validationFields.libelle.status = "is-success";
      !this.selectedDate ? this.validationFields.date.status = "is-danger" : this.validationFields.date.status = "is-success";
      !this.prix_ht ? this.validationFields.prix_ht.status = "is-danger" : this.validationFields.prix_ht.status = "is-success";
      !this.echelonnement ? this.validationFields.echelonnement.status = "is-danger" : this.validationFields.echelonnement.status = "is-success";

      if(!(this.validationFields.projet.status === "is-danger" || this.validationFields.etat.status === "is-danger" || this.validationFields.libelle.status === "is-danger" || this.validationFields.date.status === "is-danger" || this.validationFields.prix_ht.status === "is-danger" || this.validationFields.echelonnement.status === "is-danger")) {
        this.$nuxt.$loading.start()
        await this.$axios.$post('http://localhost:3000/devis', {
          "projet": this.projet,
          "etat": this.etat,
          "libelle": this.libelle,
          "dateCreation": this.selectedDate,
          "prix_ht" : this.prix_ht,
          "echelonnement" : this.echelonnement
        })
        .then(({id}) => {
          this.$buefy.notification.open({
            message: 'Votre devis a bien été crée !',
            type: 'is-success',
            duration: 3000,
            closable: false,
            autoclose: true
          });

          this.$nuxt.$loading.finish()
          // Redirect to newly created devis
          this.$router.push(`/consulter-devis/${id}`);

        })
        .catch((err) => {
          {
            //this.isNotificationOpen = true;

            this.$buefy.notification.open({
              message: 'Une erreur est survenue, veuillez réessayer plus tard.',
              type: 'is-danger',
              duration: 3000,
              closable: false,
              autoclose: true
            });

            console.error(err);
            this.$nuxt.$loading.finish()
          }
        });
      }
    },
  }
}
</script>

<style scoped>

</style>
