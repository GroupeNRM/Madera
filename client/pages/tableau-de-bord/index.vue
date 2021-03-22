<template>
  <section class="is-fullheight">
    <div class="columns is-fullheight mt-0">
      <Sidebar/>
      <div class="column is-10 section is-poppins">
        <div class="px-5 main-cards">
          <h1 class="is-size-1 pt-5 mb-5 has-text-weight-bold">Tableau de bord</h1>
          <div class="columns pt-5 mt-6 mb-6">
            <div class="column">
              <div class="flat-card">
                <div class="flat-card-header">
                  <img class="black-box is-inline-block" src="~assets/img/dolar.svg" height="50px" width="50px" alt="">
                  <h3 class="is-size-5 is-inline-block is-title-card">Moyenne prix des devis</h3>
                </div>

                <p class="is-size-2 has-text-weight-bold">3600€</p>
                <p class="subtitle">350 nouveaux devis cette semaine !</p>
              </div>
            </div>
            <div class="column">
              <div class="flat-card">
                <div class="flat-card-header">
                  <img class="black-box is-inline-block" src="~assets/img/user.svg" height="50px" width="50px" alt="">
                  <h3 class="is-size-5 is-inline-block is-title-card">Nombre de clients</h3>
                </div>

                <p class="is-size-2 has-text-weight-bold">48<span class="is-size-4"> clients</span></p>
                <p class="subtitle">3 nouveaux clients cette semaine !</p>
              </div>
            </div>
            <div class="column">
              <div class="flat-card">
                <div class="flat-card-header">
                  <img class="black-box is-inline-block" src="~assets/img/work.svg" height="50px" width="50px" alt="">
                  <h3 class="is-size-5 is-inline-block is-title-card">Nombre de projets</h3>
                </div>

                <p class="is-size-2 has-text-weight-bold">50<span class="is-size-4"> projets</span></p>
                <p class="subtitle">12 nouveaux projets cette semaine !</p>
              </div>
            </div>
          </div>
          <div class="columns">
            <h3 class="is-size-3 has-text-weight-bold column is-8">Dernières activités</h3>
            <h3 class="is-size-3 has-text-weight-bold column is-4">Dernière gamme</h3>
          </div>
          <div class="columns">
            <div class="column is-8">
              <section>
                <b-table
                  :data="isEmpty ? [] : activities"
                  :bordered="isBordered"
                  :striped="isStriped"
                  :narrowed="isNarrowed"
                  :hoverable="isHoverable"
                  :loading="isLoading"
                  :focusable="isFocusable"
                  :mobile-cards="hasMobileCards">

                  <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
                    {{ props.row.id }}
                  </b-table-column>

                  <b-table-column field="first_name" label="Libellé" v-slot="props">
                    {{ props.row.libelle }}
                  </b-table-column>

                  <b-table-column field="last_name" label="Emetteur" v-slot="props">
                    {{ props.row.emitter }}
                  </b-table-column>

                  <b-table-column field="date" label="Date" centered v-slot="props">
                    <span class="tag is-success">
                      {{ new Date(props.row.createdAt).toLocaleDateString() }}
                    </span>
                  </b-table-column>
                </b-table>
              </section>
            </div>

            <div class="column is-4">
              <div class="flat-card">
                <div class="flat-card-header">
                  <img class="black-box is-inline-block" src="~assets/img/gamme.svg" height="50px" width="50px" alt="">
                  <h3 class="is-size-5 is-inline-block is-title-card">Dernière gamme ajoutée</h3>
                </div>

                <p class="is-size-2 has-text-weight-bold">{{ this.lastGamme.libelle }}</p>
                <p class="subtitle mb-2">Reference : {{ this.lastGamme.reference }}</p>
                <p class="subtitle mb-2">Type d'angle : {{ this.lastGamme.typeAngle }}</p>
                <p class="subtitle mb-2">Type de couverture : {{ this.lastGamme.typeCouverture }}</p>
                <p class="subtitle mb-2">Type de finition : {{ this.lastGamme.typeFinition }}</p>
                <p class="subtitle mb-2">Type d'isolant : {{ this.lastGamme.typeIsolant }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "index",
  middleware: 'admin-access',
  layout: 'dashboard',
  data() {
    return {
      activities: [],
      lastGamme: [],

      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,

      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: true,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start();
    });
    this.$axios.$get('http://localhost:3000/activity')
      .then(res => {
        this.activities = res;
      })
      .catch(e => {
        this.$buefy.notification.open({
          message: 'Une erreur est survenue, veuillez réessayer plus tard.',
          type: 'is-danger',
          duration: 3000,
          closable: false,
          autoClose: true
        })
      })

    this.$axios.$get('http://localhost:3000/range/getLast')
    .then(res => {
      this.lastGamme = res;
    })
    .catch(e => {
      this.$buefy.notification.open({
        message: 'Une erreur est survenue, veuillez réessayer plus tard.',
        type: 'is-danger',
        duration: 3000,
        closable: false,
        autoClose: true
      })
    })
    .finally(() => {
      this.$nuxt.$loading.finish();
    })
  }
};
</script>

<style lang="scss" scoped>
  .main-cards {
    .column {
      &:first-child {
        padding-left: 1rem;
      }

      padding-right: 2rem;
      padding-left: 2rem;
    }
  }

  .flat-card {
    padding: 2rem;
    border-radius: 15px;
    min-height: 200px;
    background: white;
    box-shadow: 0 10px 20px 0 rgba(0, 0, 0, 0.15);

    .flat-card-header {
      padding-bottom: .5rem;

      .black-box {
        padding: 10px;
        background: #080809;
        border-radius: 15px;
        vertical-align: middle;
        margin-right: 1rem;
      }

      .is-title-card {
        line-height: 30px;
        vertical-align: middle;
      }
    }
  }
</style>
