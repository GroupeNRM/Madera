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

        <!-- Input Text : Firstname -->
        <b-field label="Nom" :type="validationFields.firstname.status" :message="validationFields.firstname.status === 'is-danger' ? validationFields.firstname.message : ''">
          <b-input
            type="text"
            v-model="inputFirstName"
            v-on:input="validationFields.firstname.status = ''"
            placeholder="DOE"
            icon="account">
          </b-input>
        </b-field>

        <!-- Input Text : Lastname -->
        <b-field label="Prénom" :type="validationFields.lastname.status" :message="validationFields.lastname.status === 'is-danger' ? validationFields.lastname.message : ''">
          <b-input
            type="text"
            v-model="inputLastName"
            v-on:input="validationFields.lastname.status = ''"
            placeholder="John"
            icon="account">
          </b-input>
        </b-field>

        <!-- Input Text : E-mail -->
        <b-field label="E-mail" :type="validationFields.email.status" :message="validationFields.email.status === 'is-danger' ? validationFields.email.message : ''">
          <b-input
            type="email"
            v-model="inputMail"
            v-on:input="validationFields.email.status = ''"
            placeholder="johnDoe@madera.fr"
            icon="email">
          </b-input>
        </b-field>

        <!-- Input Text : Password -->
        <b-field label="Mot de passe" :type="validationFields.password.status" :message="validationFields.password.status === 'is-danger' ? validationFields.password.message : ''">
          <b-input
            type="password"
            v-model="inputPassword"
            v-on:input="validationFields.password.status = ''"
            placeholder="**********"
            icon="shield-key-outline">
          </b-input>
        </b-field>

        <!-- Input Text : Repeat password -->
        <b-field label="Répéter mot de passe" :type="validationFields.repeatPassword.status" :message="validationFields.repeatPassword.status === 'is-danger' ? validationFields.repeatPassword.message : ''">
          <b-input
            type="password"
            v-model="inputRepeatPassword"
            v-on:input="validationFields.repeatPassword.status = ''"
            placeholder="**********"
            icon="shield-key-outline">
          </b-input>
        </b-field>

        <!-- Button : Log In -->
        <div class="has-text-centered">
          <b-button
            type="is-info"
            v-on:click="checkRegister"
            expanded>
            Inscription
          </b-button>
        </div>

        <!-- Link : Log In -->
        <div class="has-text-centered mt-3">
          <a
            href="/connexion"
            class="is-link">
            Vous avez un compte ? Connectez-vous
          </a>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
export default {
  name: "inscription-page",
  head(){
    return {
      title: "Inscription - Madera",
      meta: [
        {
          hid: "description",
          content: "Page d'inscription à l'application Madera"
        }
      ]
    }
  },
  data(){
    return {
      inputFirstName: null,
      inputLastName: null,
      inputMail: null,
      inputPassword: null,
      inputRepeatPassword: null,
      statusBar: null,

      isNotificationOpen: false,
      isAccountAlreadyCreated: false,

      validationFields: {
        firstname:{
          status: "",
          message: "Merci de saisir votre nom"
        },
        lastname: {
          status: "",
          message: "Merci de saisir votre prénom"
        },
        email: {
          status: "",
          message: "Merci de saisir votre adresse mail"
        },
        password: {
          status: "",
          message: "Merci de saisir un mot de passe"
        },
        repeatPassword: {
          status: "",
          message: "Merci de saisir à nouveau votre mot de passe"
        }
      },

      errorMessage: "Une erreur est survenue, veuillez réessayer plus tard."
    }
  },
  methods: {
    checkRegister: async function() {
      !this.inputFirstName ? this.validationFields.firstname.status = "is-danger" : this.validationFields.firstname.status = "is-success";
      !this.inputLastName ? this.validationFields.lastname.status = "is-danger" : this.validationFields.lastname.status = "is-success";
      !this.inputMail ? this.validationFields.email.status = "is-danger" : this.validationFields.email.status = "is-success";
      !this.inputPassword ? this.validationFields.password.status = "is-danger" : this.validationFields.password.status = "is-success";
      !this.inputRepeatPassword ? this.validationFields.repeatPassword.status = "is-danger" : this.validationFields.repeatPassword.status = "is-success";

      if(!(this.validationFields.firstname.status === "is-danger" || this.validationFields.lastname.status === "is-danger" || this.validationFields.email.status === "is-danger" || this.validationFields.password.status === "is-danger" || this.validationFields.repeatPassword.status === "is-danger")){
        if(this.inputPassword === this.inputRepeatPassword){
          this.$nuxt.$loading.start();

          await this.$axios.$post('http://localhost:3000/user/', {
            "firstName": this.inputFirstName,
            "lastName": this.inputLastName,
            "password": this.inputPassword,
            "email": this.inputMail
          })
          .then(response => {
            // Finish loader
            this.$nuxt.$loading.finish();

            // Redirect to login page
            this.$router.push('/connexion');
          })
          .catch(error => {
            // Afficher erreur dans la console
            console.log("ERREUR INSCRIPTION : " + error);

            this.$buefy.notification.open({
              message: 'Une erreur est survenue, veuillez réessayer plus tard.',
              type: 'is-danger',
              duration: 3000,
              closable: false,
              autoClose: true
            });
          })
        } else {
          this.$buefy.notification.open({
            message: 'Les mots de passe saisis ne sont pas identiques.',
            type: 'is-danger',
            duration: 3000,
            closable: false,
            autoClose: true
          });
        }
      }
    }
  }
}
</script>

<style scoped>

</style>
