<template>
  <div>
    <b-modal v-model="isActive">
      <FormModal v-on:newGamme="fetchGammes" v-on:close="isActive = false"/>
    </b-modal>
    <section class="is-fullheight">
      <div class="columns is-fullheight mt-0">
        <Sidebar/>
        <div class="column is-10 section is-poppins">
          <div>
            <b-button type="is-success" class="ml-auto mr-6 is-block" @click="isActive = true">Créer une nouvelle gamme</b-button>
          </div>
          <section class="container">
            <b-table
              :data="isEmpty ? [] : gammes[0]"
              :bordered="false"
              :striped="false"
              :narrowed="false"
              :hoverable="true"
              :loading="isLoading"
              :focusable="false"
              :mobile-cards="true">

              <b-table-column field="id" label="ID" width="40" numeric v-slot="props">
                {{ props.row.id }}
              </b-table-column>

              <b-table-column field="id" label="Référence" v-slot="props">
                {{ props.row.reference }}
              </b-table-column>

              <b-table-column field="id" label="Libellé" v-slot="props">
                {{ props.row.libelle }}
              </b-table-column>

              <b-table-column field="id" label="Type finition" v-slot="props">
                {{ props.row.typeFinition }}
              </b-table-column>

              <b-table-column field="first_name" label="Type couverture" v-slot="props">
                {{ props.row.typeCouverture }}
              </b-table-column>

              <b-table-column field="last_name" label="Type d'angle" v-slot="props">
                {{ props.row.typeAngle }}
              </b-table-column>

              <b-table-column field="last_name" label="Date de création" v-slot="props">
                <span class="tag is-success">
                  {{ new Date(props.row.createdAt).toLocaleDateString() }}
                </span>
              </b-table-column>

              <b-table-column field="date" label="Date de MaJ" v-slot="props">
                <span class="tag is-success">
                  {{ new Date(props.row.updatedAt).toLocaleDateString() }}
                </span>
              </b-table-column>
            </b-table>
          </section>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  name: "gammes",
  middleware: 'admin-access',
  layout: 'dashboard',
  data() {
    return {
      isActive: false,
      isLoading: true,
      isEmpty: false,
      gammes: []
    }
  },
  methods: {
    fetchGammes() {
      this.isLoading = true;
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
      });
      this.$axios.$get('http://localhost:3000/range')
        .then(res => {
          this.gammes = res;
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
          this.isLoading = false;
        })
    }
  },
  mounted() {
    this.fetchGammes();
  }
}
</script>

<style scoped>
  .ml-auto {
    margin-left: auto;
  }
</style>
