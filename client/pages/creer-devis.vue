<!--There are some Vue warn about type check error in the logs, it's just a dev bug : https://github.com/buefy/nuxt-buefy/issues/36 -->

<template>
  <div>
    <MainTitle>
      <span slot="first-line">Créer un</span>
      <span slot="second-line">nouveau devis</span>
    </MainTitle>

    <form action="" class="form-container">
      <div class="columns is-multiline">
        <b-field label="Reference" class="column is-half" :type="validationFields.reference.status" :message="validationFields.reference.status === 'is-danger' ? validationFields.reference.message : ''">
          <b-select
            placeholder="Reference d'un projet"
            v-model="reference"
            v-on:input="validationFields.reference.status = ''"
            expanded>
            <option>PM-GR</option>
            <option>PM-AN</option>
            <option>PM-LY</option>
            <option>PM-AI</option>
            <option>PM-PA</option>
          </b-select>
        </b-field>
        <b-field label="Prix Total HT" class="column is-half" :type="validationFields.total_ht.status" :message="validationFields.total_ht.status === 'is-danger' ? validationFields.total_ht.message : ''">
          <b-select
            placeholder="Saisir le prix HT"
            v-model="total_ht"
            v-on:input="validationFields.total_ht.status = ''"
            expanded>
            <option>10000</option>
            <option>15000</option>
            <option>20000</option>
            <option>25000</option>
            <option>30000</option>
          </b-select>
        </b-field>
        <b-field label="Prix Total TTC" class="column is-half" :type="validationFields.total_ttc.status" :message="validationFields.total_ttc.status === 'is-danger' ? validationFields.total_ttc.message : ''">
          <b-select
            placeholder="Saisir le prix TTC"
            v-model="total_ttc"
            v-on:input="validationFields.total_ttc.status = ''"
            expanded>
            <option>10500</option>
            <option>15500</option>
            <option>20500</option>
            <option>25500</option>
            <option>30500</option>
          </b-select>
        </b-field>
        <b-field label="Remise" class="column is-half" :type="validationFields.remise.status" :message="validationFields.remise.status === 'is-danger' ? validationFields.remise.message : ''">
          <b-select
            placeholder="Selectionner une remise"
            v-model="remise"
            v-on:input="validationFields.remise.status = ''"
            expanded>
            <option>Remise 20% sur le prix Hors Taxe</option>
            <option>Remise fidélité 5% sur chaque matériau</option>
          </b-select>
        </b-field>

        <b-field label="Echelonnement" class="column is-half" :type="validationFields.echelonnement.status" :message="validationFields.echelonnement.status === 'is-danger' ? validationFields.echelonnement.message : ''">
          <b-select
            placeholder="Selectionner un client"
            v-model="echelonnement"
            v-on:input="validationFields.echelonnement.status = ''"
            expanded>
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

        <b-field label="Projet" class="column is-half" :type="validationFields.projet.status" :message="validationFields.projet.status === 'is-danger' ? validationFields.projet.message : ''">
          <b-select
            placeholder="Selectionner un projet"
            v-model="projet"
            v-on:input="validationFields.projet.status = ''"
            expanded>
            <option>Grenoble</option>
            <option>Annecy</option>
            <option>Lyon</option>
            <option>Aix-le-Bain</option>
            <option>Paris</option>
          </b-select>
        </b-field>

        <b-field label="Client" class="column is-half" :type="validationFields.client.status" :message="validationFields.client.status === 'is-danger' ? validationFields.client.message : ''">
          <b-select
            placeholder="Selectionner un client"
            v-model="client"
            v-on:input="validationFields.client.status = ''"
            expanded>
            <option>Mairie de Grenoble</option>
            <option>Ville de Lyon</option>
            <option>Annecy Vision</option>
            <option>M. John</option>
            <option>Mme. Jane</option>
          </b-select>
        </b-field>
       
      </div>

      <div class="column is-full has-text-centered">
        <b-button type="is-info" v-on:click="sendData" outlined>Créer le devis</b-button>
      </div>
    </form>

    <div class="pt-6">
        <h1 class="has-text-weight-bold">Plus d'informations</h1>
    </div>

    <div class="columns">
      
      <div class="column">
        <InfoCard>
              <span slot="text-data">A la signature</span>
          </InfoCard>
        </div>
      <div class="column">
        <InfoCard>
              <span slot="text-data">3%</span>
          </InfoCard>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <InfoCard>
              <span slot="text-data">Obtention du permis</span>
          </InfoCard>
        </div>
      <div class="column">
        <InfoCard>
              <span slot="text-data">10%</span>
          </InfoCard>
      </div>
    </div>

    <div class="columns">
      <div class="column">
        <InfoCard>
              <span slot="text-data">Ouverture du chantier</span>
          </InfoCard>
        </div>
      <div class="column">
        <InfoCard>
              <span slot="text-data">15%</span>
          </InfoCard>
      </div>
    </div>

    <div class="columns">
        <div class="column">
          <InfoCard>
                <span slot="text-data">Achèvement des fondations</span>
            </InfoCard>
          </div>
        <div class="column">
          <InfoCard>
                <span slot="text-data">25%</span>
            </InfoCard>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <InfoCard>
                <span slot="text-data">Achèvement des murs</span>
            </InfoCard>
          </div>
        <div class="column">
          <InfoCard>
                <span slot="text-data">40%</span>
            </InfoCard>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <InfoCard>
                <span slot="text-data">Mise hors d'eau/hors d'air</span>
            </InfoCard>
          </div>
        <div class="column">
          <InfoCard>
                <span slot="text-data">75%</span>
            </InfoCard>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <InfoCard>
                <span slot="text-data">Achèvement des travaux d'équipement (plomberie, menuiserie, chauffage)</span>
            </InfoCard>
          </div>
        <div class="column">
          <InfoCard>
                <span slot="text-data">95%</span>
            </InfoCard>
        </div>
      </div>

      <div class="columns">
        <div class="column">
          <InfoCard>
                <span slot="text-data">Remise des clés</span>
            </InfoCard>
          </div>
        <div class="column">
          <InfoCard>
                <span slot="text-data">100%</span>
            </InfoCard>
        </div>
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
          content: "Page permettant de créer un nouveau devis de maisons modulaires"
        }
      ]
    }
  },
  data() {
    return {
      reference: "",
      total_ht: 0,
      total_ttc: 0,
      remise: "",
      locale: "fr-FR",
      echelonnement: "",
      selectedDate: new Date(),
      client: undefined,
      projet: undefined,

      validationFields: {
        reference: {
          status: "",
          message: "Merci de saisir une reference"
        },
        total_ht: {
          status: "",
          message: "Merci de saisir un prix"
        },
        total_ttc: {
          status: "",
          message: "Merci de saisir un prix"
        },
        remise: {
          status: "",
          message: "Merci de selectionner une remise"
        },
        echelonnement: {
          status: "",
          message: "Merci de choisir un echelonnement"
        },
        date: {
          status: "",
          message: "Merci de choisir une date de création"
        },
        client: {
          status: "",
          message: "Merci de choisir un client"
        },
        projet: {
          status: "",
          message: "Merci de choisir un projet"
        },
        
      },
    }
  },
  methods: {
    sendData: async function() {
    

      !this.reference ? this.validationFields.reference.status = "is-danger" : this.validationFields.reference.status = "is-success";
      !this.total_ht ? this.validationFields.total_ht.status = "is-danger" : this.validationFields.total_ht.status = "is-success";
      !this.total_ttc ? this.validationFields.total_ttc.status = "is-danger" : this.validationFields.total_ttc.status = "is-success";
      !this.remise ? this.validationFields.remise.status = "is-danger" : this.validationFields.remise.status = "is-success";
      !this.echelonnement ? this.validationFields.echelonnement.status = "is-danger" : this.validationFields.echelonnement.status = "is-success";
      !this.selectedDate ? this.validationFields.date.status = "is-danger" : this.validationFields.date.status = "is-success";
      !this.projet ? this.validationFields.projet.status = "is-danger" : this.validationFields.projet.status = "is-success";
      !this.client ? this.validationFields.client.status = "is-danger" : this.validationFields.client.status = "is-success";

      if(!(
        this.validationFields.reference.status === "is-danger" || 
        this.validationFields.total_ht.status === "is-danger" || 
        this.validationFields.total_ttc.status === "is-danger" || 
        this.validationFields.remise.status === "is-danger" || 
        this.validationFields.echelonnement.status === "is-danger" || 
        this.validationFields.date.status === "is-danger" || 
        this.validationFields.projet.status === "is-danger" || 
        this.validationFields.client.status === "is-danger")) {
        
        this.$nuxt.$loading.start()
        
        await this.$axios.$post('http://localhost:3000/devis', {
          "reference": this.reference,
          "total_ht": this.total_ht,
          "total_ttc": this.total_ttc,
          "remise": this.remise,
          "echelonnement": this.echelonnement,
          "createdAt": this.selectedDate,
          "projet": this.projet,
          "client": this.client
        })
        .then(({id}) => {
          this.$buefy.notification.open({
            message: 'Le devis a bien été crée !',
            type: 'is-success',
            duration: 3000,
            closable: false,
            autoClose: true
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
