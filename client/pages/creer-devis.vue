<template>
  <div>
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

        <b-field label="Client" class="column is-half" :type="validationFields.client.status" :message="validationFields.client.status === 'is-danger' ? validationFields.client.message : ''">
          <b-select
            placeholder="Selectionner un client"
            v-model="client"
            v-on:input="validationFields.client.status = ''"
            expanded>
            <option>client 1</option>
            <option>client 2</option>
            <option>client 3</option>
          </b-select>
        </b-field>

        <b-field label="Total Prix Hors Taxe" class="column is-half" :type="validationFields.total_ttc.status" :message="validationFields.total_ttc.status === 'is-danger' ? validationFields.total_ttc.message : ''">
          <b-input
            placeholder="Prix TTC"
            v-on:input="validationFields.total_ttc.status = ''"
            v-model.number="total_ttc"
            type = "number"
            maxlength="20">
          </b-input>
        </b-field>

        <b-field label="Total Prix TTC" class="column is-half" :type="validationFields.total_ht.status" :message="validationFields.total_ht.status === 'is-danger' ? validationFields.total_ht.message : ''">
          <b-input
            placeholder="Prix TTC"
            v-on:input="validationFields.total_ht.status = ''"
            v-model.number="total_ht"
            type = "number"
            maxlength="20">
          </b-input>
        </b-field>

        <b-field label="Remise" class="column is-half" :type="validationFields.remise.status" :message="validationFields.remise.status === 'is-danger' ? validationFields.remise.message : ''">
          <b-select
            placeholder="Selectionner une remise"
            v-model="remise"
            v-on:input="validationFields.remise.status = ''"
            expanded>
            <option>Remise de 20% sur le prix HT</option>
            <option>Remise de 5% sur chaque matériaux</option>
           
          </b-select>
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

    </form>
      <div class="column is-full has-text-centered">
        <b-button type="is-info" v-on:click="sendData" outlined>Créer le devis</b-button>
      </div>

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
    
      projet:undefined ,
      client: undefined,
      total_ttc: 0,
      total_ht: 0,
      remise: 0,
      selectedDate: new Date(),
      echelonnement: undefined,
      

      isNotificationOpen: false,

      validationFields: {
        projet: {
          status: "",
          message: "Merci de choisir un projet"
        },
        client: {
          status: "",
          message: "Merci de choisir un client"
        },
        total_ttc: {
          status: "",
          message: "Merci de saisir un prix TTC"
        },
        total_ht: {
          status: "",
          message: "Merci de sasir le prix HT"
        },
        date: {
          status: "",
          message: "Merci de choisir une date de création"
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
      !this.client ? this.validationFields.client.status = "is-danger" : this.validationFields.client.status = "is-success";
      !this.total_ttc ? this.validationFields.total_ttc.status = "is-danger" : this.validationFields.total_ttc.status = "is-success";
      !this.total_ht ? this.validationFields.total_ht.status = "is-danger" : this.validationFields.total_ht.status = "is-success";
      !this.remise ? this.validationFields.remise.status = "is-danger" : this.validationFields.remise.status = "is-success";
      !this.selectedDate ? this.validationFields.date.status = "is-danger" : this.validationFields.date.status = "is-success";
      !this.echelonnement ? this.validationFields.echelonnement.status = "is-danger" : this.validationFields.echelonnement.status = "is-success";
      

      if(!(this.validationFields.projet.status === "is-danger" || 
          this.validationFields.client.status === "is-danger" || 
          this.validationFields.total_ttc.status === "is-danger" || 
          this.validationFields.total_ht.status === "is-danger" || 
          this.validationFields.remise.status === "is-danger" || 
          this.validationFields.date.status === "is-danger" || 
          this.validationFields.echelonnement.status === "is-danger")) {

        this.$nuxt.$loading.start()

        await this.$axios.$post('http://localhost:3000/devis', {
          "projet": this.projet,
          "client": this.client,
          "total_ttc" : this.total_ttc,
          "total_ht" : this.total_ht,
          "remise": this.remise,
          "createdAt": this.selectedDate,
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
      
          this.$router.push(`/consulter-devis/${id}`);

        })
        .catch((err) => {
          {

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
