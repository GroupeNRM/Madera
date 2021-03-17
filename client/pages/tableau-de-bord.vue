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
                  <h3 class="is-size-5 is-inline-block is-title-card">Moyenne de prix des derniers devis</h3>
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
          <h3 class="is-size-3 has-text-weight-bold">Dernières activités</h3>
          <div class="columns pt-5">
            <div class="column is-8">
              <section>
                <b-table
                  :data="isEmpty ? [] : data"
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

                  <b-table-column field="first_name" label="First Name" v-slot="props">
                    {{ props.row.first_name }}
                  </b-table-column>

                  <b-table-column field="last_name" label="Last Name" v-slot="props">
                    {{ props.row.last_name }}
                  </b-table-column>

                  <b-table-column field="date" label="Date" centered v-slot="props">
                    <span class="tag is-success">
                      {{ new Date(props.row.date).toLocaleDateString() }}
                    </span>
                  </b-table-column>
                </b-table>
              </section>
            </div>

            <div class="is-4">

            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: "tableau-de-bord",
  middleware: 'admin-access',
  layout: 'dashboard',
  data() {
    const data = [
      { 'id': 1, 'first_name': 'Jesse', 'last_name': 'Simmons', 'date': '2016/10/15 13:43:27', 'gender': 'Male' },
      { 'id': 2, 'first_name': 'John', 'last_name': 'Jacobs', 'date': '2016/12/15 06:00:53', 'gender': 'Male' },
      { 'id': 3, 'first_name': 'Tina', 'last_name': 'Gilbert', 'date': '2016/04/26 06:26:28', 'gender': 'Female' },
      { 'id': 4, 'first_name': 'Clarence', 'last_name': 'Flores', 'date': '2016/04/10 10:28:46', 'gender': 'Male' },
      { 'id': 5, 'first_name': 'Anne', 'last_name': 'Lee', 'date': '2016/12/06 14:38:38', 'gender': 'Female' }
    ]

    return {
      data,

      open: true,
      overlay: false,
      fullheight: true,
      fullwidth: false,
      right: false,

      isEmpty: false,
      isBordered: false,
      isStriped: false,
      isNarrowed: false,
      isHoverable: false,
      isFocusable: false,
      isLoading: false,
      hasMobileCards: true
    };
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

  .is-poppins {
    color: #2F2C37;
    font-family: 'Poppins', sans-serif;
  }
</style>
