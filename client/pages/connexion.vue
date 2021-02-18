<template>
  <div class="columns is-vcentered">
    <div class="is-fixed-top">
      <b-notification
        type="is-danger"
        aria-close-label="Close notification"
        role="alert"
        v-model="isNotificationOpen"
        position="is-top-right"
        :duration="3000"
        :auto-close="true"
        :closable="false">
        {{errorMessage}}
      </b-notification>
    </div>

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
            type="email"
            v-model="inputMail"
            v-on:input="validationFields.email.status = ''"
            placeholder="johnDoe@domain.fr"
            icon="email">
          </b-input>
        </b-field>

        <b-field label="Mot de passe" :type="validationFields.password.status" :message="validationFields.password.status === 'is-danger' ? validationFields.password.message : ''">
          <b-input
            type="password"
            v-model="inputPassword"
            v-on:input="validationFields.password.status = ''"
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
      inputMail: null,
      inputPassword: null,

      isNotificationOpen: false,

      validationFields: {
        email: {
          status: "",
          message: "Merci de saisir votre adresse mail"
        },
        password: {
          status: "",
          message: "Merci de saisir votre mot de passe"
        }
      },

      errorMessage: "Une erreur est survenue, veuillez réessayer plus tard."
    }
  },
  methods: {
    checkLogin: async function(){
      !this.inputMail ? this.validationFields.email.status = "is-danger" : this.validationFields.email.status = "is-success";
      !this.inputPassword ? this.validationFields.password.status = "is-danger" : this.validationFields.password.status = "is-success";

      if(!(this.validationFields.email.status === "is-danger" || this.validationFields.password.status === "is-danger")){
        this.$nuxt.$loading.start()

        await this.$axios.$post('http://localhost:3000/user/login', {
          "email": this.inputMail,
          "password": this.inputPassword
        })
        .then((res) => {
          this.$nuxt.$loading.finish()
          console.log(res)
        })
        .catch((err) => {
          if(err.response?.status === 401) {
            this.errorMessage = err.response.data.message;
          } else {
            this.errorMessage = "Une erreur est survenue, veuillez réessayer plus tard.";
          }
          this.isNotificationOpen = true
          this.$nuxt.$loading.finish()
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
