<template>
  <div class="columns is-vcentered">
    <!-- IMG Madera -->
    <div class="column is-6">
      <img
        src="~assets/img/IMG_BACKGROUND_LOGIN.jpg"
        alt="Background login page"
      >
    </div>

    <div class="column is-6">
      <section class="section">
        <div class="has-text-centered">
          <!-- Logo Madera -->
          <img
            src="~assets/logo_madera.svg"
            alt="Logo Madera"
          >
        </div>

        <form v-on:submit.prevent>
          <!-- Input Text : E-Mail -->
          <b-field label="E-mail" :type="validationFields.email.status" :message="validationFields.email.status === 'is-danger' ? validationFields.email.message : ''">
            <b-input
              type="email"
              v-model="inputMail"
              v-on:input="validationFields.email.status = ''"
              placeholder="johnDoe@domain.fr"
              icon="email">
            </b-input>
          </b-field>

          <!-- Input Text : Password -->
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

          <!-- Checkbox : Save account -->
          <b-field>
            <b-checkbox>Se souvenir de moi</b-checkbox>
          </b-field>

          <!-- Button : Log In -->
          <div class="has-text-centered">
            <b-button
              type="is-info"
              v-on:click="userLogin"
              expanded>
              Connexion
            </b-button>
          </div>
        </form>

        <!-- Link : Register -->
        <div class="has-text-centered mt-3">
          <NuxtLink
            to="/inscription"
            class="is-link">
            Pas de compte ? Inscrivez-vous
          </NuxtLink>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "connexion-page",
  layout: 'no-header',
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
    userLogin: async function() {
      !this.inputMail ? this.validationFields.email.status = "is-danger" : this.validationFields.email.status = "is-success";
      !this.inputPassword ? this.validationFields.password.status = "is-danger" : this.validationFields.password.status = "is-success";

      if(!(this.validationFields.email.status === "is-danger" || this.validationFields.password.status === "is-danger")) {
        this.$nuxt.$loading.start()

        try {
          await this.$auth.loginWith('local', {
            data: {
              "email": this.inputMail,
              "password": this.inputPassword
            }
          });
          this.$nuxt.$loading.finish()
        } catch(err) {
            if(err.response?.status === 401) {
              this.errorMessage = err.response.data.message;
            } else {
              this.errorMessage = "Une erreur est survenue, veuillez réessayer plus tard.";
            }

            this.$buefy.notification.open({
              message: this.errorMessage,
              type: 'is-danger',
              duration: 3000,
              closable: false,
              autoClose: true
            });

            this.$nuxt.$loading.finish()
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
