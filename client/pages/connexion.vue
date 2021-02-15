<template>
  <div class="container">
    <div class="column has-text-centered">
      <img
        src="~assets/logo_madera.svg"
        alt="The Madera Logo!"
      >
    </div>

    <form action="#" class="form-container">
      <div class="column is-full">
        <b-field label="E-mail">
          <b-input type="email" placeholder="johnDoe@domain.fr" icon="email"></b-input>
        </b-field>
      </div>

      <div class="column is-full">
        <b-field label="Mot de passe">
          <b-input type="password" placeholder="************" icon="shield-key-outline" password-reveal></b-input>
        </b-field>
      </div>

      <div class="column is-full">
        <b-field>
          <b-checkbox>Se souvenir de moi</b-checkbox>
        </b-field>
      </div>

      <div class="column is-full has-text-centered">
        <b-button type="is-info" v-on:click="checkLogin" expanded>Connexion</b-button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "connexion-page",
  data(){
    return {

    }
  },
  methods: {
    checkLogin: function(){
      alert("CACA")
    }
  }
}
</script>

<style scoped>

</style>
