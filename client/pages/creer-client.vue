<template>
  <div>
    <MainTitle>
      <span slot="first-line">Créer un</span>
      <span slot="second-line">nouveau client</span>
    </MainTitle>

    <form action="" class="form-container">
      <div class="columns is-multiline">
        <b-field label="Prenom" class="column is-half" :type="validationFields.client.status" :message="validationFields.client.status === 'is-danger' ? validationFields.client.message : ''">
          <b-input
            placeholder="Jean.."
            v-on:input="validationFields.libelle.status = ''"
            v-model="libelle"
            maxlength="65">
          </b-input>
        </b-field>

        <b-field label="Nom de famille" class="column is-half" :type="validationFields.devis.status" :message="validationFields.devis.status === 'is-danger' ? validationFields.devis.message : ''">
          <b-input
            placeholder="Dupont.."
            v-on:input="validationFields.libelle.status = ''"
            v-model="libelle"
            maxlength="65">
          </b-input>
        </b-field>

        <b-field label="Adresse" class="column is-6">
          <b-autocomplete
            :data="adresses"
            placeholder="87 Rue de la pièce"
            field="properties.name"
            :loading="isFetching"
            @typing="getAsyncData"
            @select="option => setAdresseData(option)"
          >

            <template slot-scope="props">
              <div>
                <p>{{ props.option.properties.label }}</p>
              </div>
            </template>
            <template #footer>
              <span v-show="adresses.length === 0" class="has-text-grey">Il n'existe pas de ville portant ce nom</span>
            </template>
          </b-autocomplete>
        </b-field>

        <b-field label="Ville" class="column is-4">
          <b-input
            placeholder="Paris"
            :value="ville"
            maxlength="65">
          </b-input>
        </b-field>

        <b-field label="Code Postal" class="column is-2" :type="validationFields.date.status" :message="validationFields.date.status === 'is-danger' ? validationFields.date.message : ''">
          <b-input v-model="codePostal" :value="codePostal" placeholder="93160"></b-input>
        </b-field>

        <b-field label="Libellé/Note" class="column is-full" :type="validationFields.date.status" :message="validationFields.date.status === 'is-danger' ? validationFields.date.message : ''">
          <label>
            <textarea class="textarea has-fixed-size" placeholder="Notes à propos du client" rows="5"></textarea>
          </label>
        </b-field>

      </div>

      <div class="column is-full has-text-centered">
        <b-button type="is-info" v-on:click="sendData" outlined>Créer le projet</b-button>
      </div>
    </form>
  </div>
</template>

<script>
import debounce from 'lodash/debounce';

export default {
  name: "creer-projet",
  head() {
    return {
      title: "Créer un nouveau client",
      meta: [
        {
          hid: "description",
          content: "Page permettant la création d'un nouveau client"
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

      adress: '',
      isFetching: false,
      adressSelected: null,
      adresses: [],
      codePostal: undefined,
      ville: '',
    }
  },
  methods: {
    getAsyncData: debounce(function (adressInput) {
      if (this.adress !== (adressInput)) {
        this.name = (adressInput)
        this.adresses = []
      }
      if (!(adressInput).length) {
        this.adresses = []
        return
      }
      this.isFetching = true
      this.$axios.$get(`https://api-adresse.data.gouv.fr/search/?q=${adressInput}&type=housenumber`)
        .then(data => {
          console.log(data.features)
          data.features.forEach((adress) => this.adresses.push(adress))
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    }, 500),

    setAdresseData: function(selected) {
      console.log(selected);
      this.adressSelected = selected;

      this.codePostal = this.adressSelected?.properties.postcode;
      this.ville = this.adressSelected?.properties.city;
    },

    sendData: async function () {
      !this.client ? this.validationFields.client.status = "is-danger" : this.validationFields.client.status = "is-success";
      !this.devis ? this.validationFields.devis.status = "is-danger" : this.validationFields.devis.status = "is-success";
      !this.libelle ? this.validationFields.libelle.status = "is-danger" : this.validationFields.libelle.status = "is-success";
      !this.selectedDate ? this.validationFields.date.status = "is-danger" : this.validationFields.date.status = "is-success";

      if (!(this.validationFields.client.status === "is-danger" || this.validationFields.devis.status === "is-danger" || this.validationFields.libelle.status === "is-danger" || this.validationFields.date.status === "is-danger")) {
        this.$nuxt.$loading.start()
        await this.$axios.$post('http://localhost:3000/project', {
          "client": this.client,
          "devis": this.devis,
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
            {
              this.$buefy.notification.open({
                message: 'Une erreur est survenue, veuillez réessayer plus tard.',
                type: 'is-danger',
                duration: 3000,
                closable: false,
                autoClose: true
              });
              console.log(err);
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
