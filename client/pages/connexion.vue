<template>
  <div class="columns is-vcentered">
    <div class="column is-6">
      <img
        src="~assets/img/IMG_BACKGROUND_LOGIN.jpg"
        alt="Background login page"
      >
    </div>

    <div class="column is-6">
      <section class="section">
        <div class="has-text-centered">
          <img
            src="~assets/logo_madera.svg"
            alt="Logo Madera"
          >
        </div>

        <b-field label="E-mail" :type="validationFields.email.status" :message="validationFields.email.status === 'is-danger' ? validationFields.email.message : ''">
          <b-input
            v-model="email"
            v-on:input="validationFields.email.status = ''"
            type="email"
            placeholder="johnDoe@domain.fr"
            icon="email">
          </b-input>
        </b-field>

        <b-field label="Mot de passe" :type="validationFields.motDePasse.status" :message="validationFields.motDePasse.status === 'is-danger' ? validationFields.motDePasse.message : ''">
          <b-input
            type="password"
            v:model="motDePasse"
            v-on:input="validationFields.motDePasse.status = ''"
            placeholder="************"
            icon="shield-key-outline"
            password-reveal>
          </b-input>
        </b-field>

        <b-field>
          <b-checkbox>Se souvenir de moi</b-checkbox>
        </b-field>

        <div class="has-text-centered">
          <b-button
            type="is-info"
            v-on:click="checkLogin"
            expanded>
            Connexion
          </b-button>
        </div>

        <div class="has-text-centered mt-3">
          <a
            href="#"
            class="is-link">
            Pas de compte ? Inscrivez-vous
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "connexion-page",
  head(){
    return {
      title: "Connexion - Madera",
      meta: [
        {
          hid: "description",
          content: "Page de connexion à l'application Madera"
        }
      ]
    }
  },
  data(){
    return {
      email: undefined,
      motDePasse: undefined,

      validationFields: {
        email: {
          status: "",
          message: "Merci de saisir votre adresse mail"
        },
        motDePasse: {
          status: "",
          message: "Merci de saisir votre mot de passe"
        }
      }
    }
  },
  methods: {
    checkLogin: function(){
      !this.email ? this.validationFields.email.status = "is-danger" : this.validationFields.email.status = "is-success";
      !this.motDePasse ? this.validationFields.motDePasse.status = "is-danger" : this.validationFields.motDePasse.status = "is-success";

      if(!(this.validationFields.email.status === "is-danger" || this.validationFields.motDePasse.status === "is-danger")){
        // TODO : Nuxt Loading Start
        // TODO : Axios GET + Traitement
        alert("CACA");
      }
    }
  }
}
</script>

<style scoped>

</style>
