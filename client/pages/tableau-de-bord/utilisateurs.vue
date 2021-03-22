<template>
  <section class="is-fullheight">
    <div class="columns is-fullheight mt-0">
      <Sidebar/>
      <div class="column is-10 section is-poppins">
        <section class="container">
          <b-table
            :data="isEmpty ? [] : users"
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

            <b-table-column field="prenom" label="Prénom" v-slot="props">
              {{ props.row.firstName }}
            </b-table-column>

            <b-table-column field="nom" label="Nom" v-slot="props">
              {{ props.row.lastName }}
            </b-table-column>

            <b-table-column field="email" label="Email" v-slot="props">
              {{ props.row.email }}
            </b-table-column>

            <b-table-column field="actif" label="Actif" v-slot="props">
              {{ props.row.isActive }}
            </b-table-column>

            <b-table-column field="role" label="Rôle" v-slot="props">
              <b-select placeholder="Choisir un rôle" v-model="props.row.role" v-on:input="updateRole($event, props.row.id)">
                <option value="ROLE_BASIC">ROLE_BASIC</option>
                <option value="ROLE_CLIENT">ROLE_CLIENT</option>
                <option value="ROLE_ADMIN">ROLE_ADMIN</option>
              </b-select>
            </b-table-column>

            <b-table-column field="date" label="Date de création" v-slot="props">
              <span class="tag is-success">
                {{ new Date(props.row.createdAt).toLocaleDateString() }}
              </span>
            </b-table-column>
          </b-table>
        </section>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "utilisateurs",
  middleware: 'admin-access',
  layout: 'dashboard',
  data() {
    return {
      isActive: false,
      isLoading: true,
      isEmpty: false,
      users: []
    }
  },
  methods: {
    fetchUsers() {
      this.isLoading = true;
      this.$nextTick(() => {
        this.$nuxt.$loading.start();
      });
      this.$axios.$get('http://localhost:3000/user')
        .then(res => {
          this.users = res;
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
    },

    updateRole(event, userId) {
      this.$nuxt.$loading.start();
      this.$axios.$put('http://localhost:3000/user/update-role ', {
        'id': userId,
        'role': event
      })
      .then(() => {
        this.$buefy.notification.open({
          message: `Le rôle de l'utilisateur à bien été mis à jour`,
          type: 'is-success',
          duration: 3000,
          closable: false,
          autoClose: true
        })
      })
      .catch(e => {
        this.$buefy.notification.open({
          message: 'Une erreur est survenue, veuillez réessayer plus tard.',
          type: 'is-danger',
          duration: 3000,
          closable: false,
          autoClose: true
        })
        console.log(e);
      })
      .finally(() => {
        this.$nuxt.$loading.finish();
      })
    }
  },
  mounted() {
    this.fetchUsers();
  }
}
</script>

<style scoped>

</style>
