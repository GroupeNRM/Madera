<!--There are some Vue warn about type check error in the logs, it's just a dev bug : https://github.com/buefy/nuxt-buefy/issues/36 -->

<template>
  <div>
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
            <option v-for="client in listingClient" :value="client.id" :key="client.id">{{client.lastName}} {{client.firstName}}</option>
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
  middleware: 'admin-access',
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

      listingClient: [],

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
      !this.libelle ? this.validationFields.libelle.status = "is-danger" : this.validationFields.libelle.status = "is-success";
      !this.selectedDate ? this.validationFields.date.status = "is-danger" : this.validationFields.date.status = "is-success";

      if(!(this.validationFields.client.status === "is-danger" ||
      this.validationFields.libelle.status === "is-danger" ||
      this.validationFields.date.status === "is-danger")) {

        this.$nuxt.$loading.start()

        await this.$axios.$post('http://localhost:3000/project', {
          "client": this.client,
          "libelle": this.libelle,
          "dateCreation": this.selectedDate
        })
        .then(({id}) => {
          this.$buefy.notification.open({
            message: 'Le projet a bien été crée !',
            type: 'is-success',
            duration: 3000,
            closable: false,
            autoClose: true
          });
          this.$nuxt.$loading.finish()
          this.$router.push(`/consulter-projet/${id}`);
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
          this.$nuxt.$loading.finish()
        });
      }
    },
  },

  mounted() {
    this.$axios.$get('http://localhost:3000/client')
      .then(res => {
        console.log(res[0]);
        this.listingClient = res[0];
      })
      .catch(e => {
        this.$buefy.notification.open({
          message: 'Une erreur est survenue, veuillez réessayer plus tard.',
          type: 'is-danger',
          duration: 3000,
          closable: false,
          autoClose: true
        });
      })
  }
}
</script>

<style scoped>

</style>
