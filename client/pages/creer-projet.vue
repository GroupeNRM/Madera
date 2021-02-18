<!--There are some Vue warn about type check error in the logs, it's just a dev bug : https://github.com/buefy/nuxt-buefy/issues/36 -->

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
      <span slot="second-line">nouveau projet</span>
    </MainTitle>

    <form action="" class="form-container">
      <div class="columns is-multiline">
        <b-field label="Client" class="column is-half" :type="validationFields.client.status" :message="validationFields.client.status === 'is-danger' ? validationFields.client.message : ''">
          <b-select
            placeholder="Selectionner un client"
            v-model="client"
            v-on:input="validationFields.client.status = ''"
            expanded>
            <option>test</option>
          </b-select>
        </b-field>

        <b-field label="Devis" class="column is-half" :type="validationFields.devis.status" :message="validationFields.devis.status === 'is-danger' ? validationFields.devis.message : ''">
          <b-select
            placeholder="Selectionner un devis"
            v-model="devis"
            v-on:input="validationFields.devis.status = ''"
            expanded>
            <option>test</option>
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
            v-on:input="validationFields.client.status = ''"
            placeholder="26-12-2020"
            icon="calendar-today"
            trap-focus>
          </b-datepicker>
        </b-field>
      </div>

      <div class="column is-full has-text-centered">
        <b-button type="is-info" v-on:click="sendData" outlined>Créer le projet</b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "creer-projet",
  head() {
    return {
      title: "Créer un nouveau projet",
      meta: [
        {
          hid: "description",
          content: "Page permettant de créer un nouveau projet de maisons modulaires"
        }
      ]
    }
  },
  data() {
    return {
      selectedDate: new Date(),
      locale: "fr-FR",
      libelle: "",
      client: undefined,
      devis: undefined,

      isNotificationOpen: false,

      validationFields: {
        client: {
          status: "",
          message: "Merci de choisir un client"
        },
        devis: {
          status: "",
          message: "Merci de choisir un devis"
        },
        libelle: {
          status: "",
          message: "Merci de saisir un libellé"
        },
        date: {
          status: "",
          message: "Merci de choisir une date de création"
        }
      },
    }
  },
  methods: {
    sendData: async function() {
      // Spaghetti zone

      !this.client ? this.validationFields.client.status = "is-danger" : this.validationFields.client.status = "is-success";
      !this.devis ? this.validationFields.devis.status = "is-danger" : this.validationFields.devis.status = "is-success";
      !this.libelle ? this.validationFields.libelle.status = "is-danger" : this.validationFields.libelle.status = "is-success";
      !this.selectedDate ? this.validationFields.date.status = "is-danger" : this.validationFields.date.status = "is-success";

      if(!(this.validationFields.client.status === "is-danger" || this.validationFields.devis.status === "is-danger" || this.validationFields.libelle.status === "is-danger" || this.validationFields.date.status === "is-danger")) {
        this.$nuxt.$loading.start()
        await this.$axios.$post('http://localhost:3000/project', {
          "client": this.client,
          "devis": this.devis,
          "libelle": this.libelle,
          "dateCreation": this.selectedDate
        })
        .then(({id}) => {
          this.$nuxt.$loading.finish()
          this.$router.push(`/consulter-projet/${id}`);
        })
        .catch((err) => {
          {
            this.isNotificationOpen = true;
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
