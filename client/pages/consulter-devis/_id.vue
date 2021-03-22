<template>
  <div>
    <p v-if="$fetchState.pending">Fetching devis...</p>
    <p v-else-if="$fetchState.error">An error occurred :(</p>
    <div v-else>
      <div class="main-content mb-6">
        <div class="columns is-multiline">
          <div class="column">
            <NuxtLink to="/consulter-devis" class="backmenu-link is-size-2 has-text-weight-bold"><b-icon class="pr-5" icon="arrow-left" size="is-small"></b-icon>Revenir aux devis</NuxtLink>

            <MainTitle>
              <span slot="second-line">Devis n°{{this.$route.params.id}}</span>
            </MainTitle>

            <ul class="info-devis mb-3">
              <li>Projet : <span class="has-text-primary">{{ devisData.projet }}</span></li>
              <li>Reference : {{ devisData.reference }}</li>
              <li>Client : {{ devisData.client }}</li>
            </ul>

            <NuxtLink :to="`/consulter-devis/editer-devis/${devisData.id}`"><b-button class="pl-6 pr-6 mr-5" type="is-primary" outlined>Editer</b-button></NuxtLink>
          </div>
          <div class="column is-0-tablet-only">
            <figure class="is-inline-block">
              <img src="~assets/img/devis-madera.png" width="280" alt="Devis projet maison modulaire" class="image">
            </figure>
          </div>
        </div>
      </div>

      <h3 class="pt-6 has-text-weight-bold">Plus d'informations</h3>

      <div class="columns pt-2">
        <div class="column">
          <InfoCard icon="finance">
            <span slot="text-data"><b>Remise client</b> : {{devisData.remise}}</span>
          </InfoCard>
        </div>
        <div class="column">
          <InfoCard icon="magnify">
            <span slot="text-data"><b>Echelonnement</b> : {{devisData.echelonnement}}</span>
          </InfoCard>
        </div>
        <div class="column">
          <InfoCard icon="currency-eur">
            <span slot="text-data"><b>Prix TTC</b> : <span id="textePrixTTC">{{devisData.total_ttc}} €</span></span>
          </InfoCard>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  head() {
    return {
      title: "Visualiser un devis",
      meta: [
        {
          hid: "description",
          content: "Page permettant de visualiser les données d'un devis."
        }
      ]
    }
  },
  data() {
    return {
      devisData: []
    }
  },
  async fetch() {
    this.devisData = await this.$axios.$get(`http://localhost:3000/devis/${this.$route.params.id}`);
    console.log(this.devisData)
  }
}
</script>

<style lang="scss" scoped>
  #textePrixTTC{
    color: #00CC00;
    font-weight: bold;
  }

  .info-devis {
    font-family: "Poppins", serif;
    font-weight: bold;

    li:first-child {
      font-size: 40px;
    }

    li:not(:first-child) {
      font-size: 28px;
    }

    li {
      span {
        word-break: break-word;
      }
    }
  }

  h3 {
    font-family: "Poppins", serif;
    font-size: 45px;
  }
</style>
