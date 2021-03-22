<template>
  <div>
    <MainTitle>
      <span slot="first-line">Créer un</span>
      <span slot="second-line">nouveau client</span>
    </MainTitle>

    <form class="form-container">
      <div class="columns is-multiline">
        <b-field label="Prenom" class="column is-half" :type="validationFields.prenom.status" :message="validationFields.prenom.status === 'is-danger' ? validationFields.prenom.message : ''">
          <b-input
            placeholder="Jean.."
            v-on:input="validationFields.prenom.status = ''"
            v-model="formData.prenom"
            maxlength="65">
          </b-input>
        </b-field>

        <b-field label="Nom de famille" class="column is-half" :type="validationFields.nom.status" :message="validationFields.nom.status === 'is-danger' ? validationFields.nom.message : ''">
          <b-input
            placeholder="Dupont.."
            v-on:input="validationFields.nom.status = ''"
            v-model="formData.nom"
            maxlength="65">
          </b-input>
        </b-field>

        <b-field label="Mail" class="column is-half" :type="validationFields.mail.status" :message="validationFields.mail.status === 'is-danger' ? validationFields.mail.message : ''">
          <b-input
            placeholder="bill.gates@microsoft.com"
            v-on:input="validationFields.mail.status = ''"
            v-model="formData.mail"
            maxlength="65">
          </b-input>
        </b-field>

        <b-field label="Téléphone" class="column is-half" :type="validationFields.telephone.status" :message="validationFields.telephone.status === 'is-danger' ? validationFields.telephone.message : ''">
          <b-input
            placeholder="06.66.66.66.66"
            v-on:input="validationFields.telephone.status = ''"
            v-model="formData.telephone"
            maxlength="10">
          </b-input>
        </b-field>

        <b-field label="Particulier" class="column is-6" :type="validationFields.statutPro.status" :message="validationFields.statutPro.status === 'is-danger' ? validationFields.statutPro.message : ''">
          <button class="flat-button" @click.prevent="formData.statutPro = 'Particulier'" :class="{ 'is-selected': formData.statutPro === 'Particulier' }" @click="validationFields.statutPro.status = ''">
            <img src="~assets/img/user.svg" alt="User icon">
          </button>
        </b-field>

        <b-field label="Professionnel" class="column is-6" :type="validationFields.statutPro.status" :message="validationFields.statutPro.status === 'is-danger' ? validationFields.statutPro.message : ''">
          <button class="flat-button" @click.prevent="formData.statutPro = 'Professionnel'" :class="{ 'is-selected': formData.statutPro === 'Professionnel' }" @click="validationFields.statutPro.status = ''">
            <img src="~assets/img/collectivite.svg" alt="Professionnal icon">
          </button>
        </b-field>

        <b-field label="Adresse" class="column is-6" :type="validationFields.adress.status" :message="validationFields.adress.status === 'is-danger' ? validationFields.adress.message : ''">
          <b-autocomplete
            v-on:input="validationFields.adress.status = ''"
            v-model="formData.adress"
            :value="formData.adress"
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
              <span v-show="adresses.length === 0" class="has-text-grey">Aucune adresse trouvée!</span>
            </template>
          </b-autocomplete>
        </b-field>

        <b-field label="Ville" class="column is-4" :type="validationFields.ville.status" :message="validationFields.ville.status === 'is-danger' ? validationFields.ville.message : ''">
          <b-input
            v-on:change="validationFields.ville.status = ''"
            v-model="formData.ville"
            placeholder="Paris"
            :value="formData.ville"
            maxlength="65">
          </b-input>
        </b-field>

        <b-field label="Code Postal" class="column is-2" :type="validationFields.codePostal.status" :message="validationFields.codePostal.status === 'is-danger' ? validationFields.codePostal.message : ''">
          <b-input v-model="formData.codePostal" :value="formData.codePostal" v-on:change="validationFields.codePostal.status = ''" placeholder="93160"></b-input>
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
      formData: {
        prenom: undefined,
        nom: undefined,
        mail: undefined,
        telephone: undefined,
        statutPro: undefined,
        adress: undefined,
        codePostal: undefined,
        ville: undefined,
      },

      validationFields: {
        prenom: {
          status: "",
          message: "Merci de saisir un prénom"
        },
        nom: {
          status: "",
          message: "Merci de choisir un nom"
        },
        mail: {
          status: "",
          message: "Merci de saisir un mail"
        },
        telephone: {
          status: "",
          message: "Merci de saisir un numéro de téléphone"
        },
        statutPro: {
          status: "",
          message: "Merci de choisir le type de client"
        },
        adress: {
          status: "",
          message: "Merci de saisir une adresse"
        },
        ville: {
          status: "",
          message: "Merci de saisir une ville"
        },
        codePostal: {
          status: "",
          message: "Merci de saisir un code postal"
        }
      },

      isFetching: false,
      adresses: [],
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
      // Fetch instead of Axios because Axios add Authorization header and he doesn't want to delete it even when I force him to
      fetch(`https://api-adresse.data.gouv.fr/search/?q=${adressInput}&type=housenumber`)
        .then(data => {
          data.json().then(formattedData => {
            formattedData.features.forEach((adress) => this.adresses.push(adress))
          })
        })
        .catch((error) => {
          throw error
        })
        .finally(() => {
          this.isFetching = false
        })
    }, 500),

    setAdresseData: function(selected) {
      this.formData.adress = selected?.properties.name;
      this.formData.codePostal = selected?.properties.postcode;
      this.formData.ville = selected?.properties.city;

      this.validationFields.ville.status = "";
      this.validationFields.codePostal.status = "";
    },

    /**
     * Méthode générique permettant de vérifier si tous les éléments d'un formulaire sont bien remplis
     * Renvoie false si il n'y a pas d'erreurs, true sinon
     * @returns {boolean}
     */
    checkData: function() {
      let errorExist = false;
      let statusArray = [];

      for (const [varName, data] of Object.entries(this.formData)) {
        // If no data supplied in the inputs
        if(!data) {
          this.validationFields[varName].status = "is-danger";
          errorExist = true;
        } else {
          this.validationFields[varName].status = "is-success";
          for(const [, state] of Object.entries(this.validationFields)) {
            if (state.status !== "is-success") {
              break;
            }
          }
        }
      }
      return errorExist;
    },

    sendData: async function () {
      let isIncomplete = this.checkData();
      if (!isIncomplete) {
        this.$nuxt.$loading.start()
        await this.$axios.$post('http://localhost:3000/client', {
          ...this.formData
        })
          .then(({id}) => {
            this.$buefy.notification.open({
              message: 'Le client a bien été crée !',
              type: 'is-success',
              duration: 3000,
              closable: false,
              autoClose: true
            });
            this.$nuxt.$loading.finish()
          })
          .catch(err => {
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
  },
}
</script>

<style lang="scss" scoped>
  .flat-button {
    width: 100%;
    min-height: 135px;
    border-radius: 5px;
    border: 1px solid #dbdbdb;
    background-color: transparent;

    &:hover {
      background: lighten(lightgray, 15%);
    }

    &.is-selected {
      background: lighten(#3498DB, 15%);
    }
  }
</style>
