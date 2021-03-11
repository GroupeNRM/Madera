<template>
  <div class="column is-one-third">
    <div class="card">
      <header class="card-header">
        <div>
          <img src="~assets/img/devis-madera.png" alt="" width="80">
        </div>
      </header>
      <div class="card-content">
        <div class="content px-5">
          <p style="font-weight:bold" class="has-text-grey-darker is-text-ellipsis">Référence du projet : <span style="font-weight:bold;color:#0099ff">{{data.reference}}</span></p>

          <div class="has-text-right">
            <NuxtLink :to="`/consulter-devis/${data.id}`"><b-button class="has-text-grey-dark">Voir le devis</b-button></NuxtLink>
          </div>
        </div>
      </div>
      <footer class="card-footer">
        <div class="card-footer-item is-justify-content-start px-5">
          <p style="font-weight:bold" class="has-text-grey-light">Date de création : {{ (new Date(data.createdAt).getDate())  }} - {{ (new Date(data.createdAt).getMonth() + 1)  }} - {{ (new Date(data.createdAt).getFullYear())  }}</p>
        </div>
      </footer>
    </div>
  </div>
</template>

<script>
export default {
  name: "CardVue",
  props: {
    data: {
      type: Object,
      required: true
    },
  }
}
</script>

<style lang="scss" scoped>
  .card {
    border-radius: 15px;
    position: relative;
    top: 0;
    transition: all 0.2s ease-out;
    font-family: "Roboto", serif;

    &:hover {
      transition: all 0.2s ease-out;
      top: -4px;
      box-shadow: 0 4px 8px rgba(38, 38, 38, 0.2);
    }

    .card-header {
      box-shadow: none;
    }

    .card-content {
      padding: 0;

      button {
        border-radius: 13px;
      }
    }

    .card-footer {
      border: 0;
    }
  }

</style>
