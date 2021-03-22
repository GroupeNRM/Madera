<template>
  <form action="">
    <div class="modal-card" style="width: auto">
      <header class="modal-card-head">
        <p class="is-poppins has-text-weight-bold is-size-5 modal-card-title">Ajouter une nouvelle gamme</p>
      </header>
      <section class="modal-card-body">
        <b-field label="Reference">
          <b-input
            type="text"
            :value="dataForm.reference"
            v-model="dataForm.reference"
            placeholder="A487GEZ5C"
            required>
          </b-input>
        </b-field>

        <b-field label="Libellé">
          <b-input
            type="text"
            :value="dataForm.libelle"
            v-model="dataForm.libelle"
            placeholder="Ma nouvelle gamme"
            required>
          </b-input>
        </b-field>

        <b-field label="Type de finition">
          <b-input
            type="text"
            :value="dataForm.typeFinition"
            v-model="dataForm.typeFinition"
            placeholder="Finition métal"
            required>
          </b-input>
        </b-field>

        <b-field label="Type de couverture">
          <b-input
            type="text"
            :value="dataForm.typeCouverture"
            v-model="dataForm.typeCouverture"
            placeholder="Un type de couverture..."
            required>
          </b-input>
        </b-field>

        <b-field label="Type d'angle">
          <b-input
            type="text"
            :value="dataForm.typeAngle"
            v-model="dataForm.typeAngle"
            placeholder="Angle droit..."
            required>
          </b-input>
        </b-field>

        <b-field label="Type d'isolant">
          <b-input
            type="text"
            :value="dataForm.typeIsolant"
            v-model="dataForm.typeIsolant"
            placeholder="Isolant en bois.."
            required>
          </b-input>
        </b-field>
      </section>
      <footer class="modal-card-foot">
        <b-button
          @click="sendData"
          label="Ajouter"
          type="is-success" />
      </footer>
    </div>
  </form>
</template>

<script>
export default {
  name: "FormModal",
  data() {
    return {
      dataForm: {
        reference: undefined,
        libelle: undefined,
        typeFinition: undefined,
        typeCouverture: undefined,
        typeAngle: undefined,
        typeIsolant: undefined
      },
      isComponentModalActive: false,
      formProps: {
        email: 'evan@you.com',
        password: 'testing'
      }
    }
  },
  methods: {
    async sendData() {
      let isIncomplete = this.checkData();
      if (!isIncomplete) {
        this.$nuxt.$loading.start()
        await this.$axios.$post('http://localhost:3000/range', {
          ...this.dataForm
        })
          .then(() => {
            this.$buefy.notification.open({
              message: 'La gamme a bien été crée !',
              type: 'is-success',
              duration: 3000,
              closable: false,
              autoClose: true
            });
            this.$nuxt.$loading.finish()
            this.$emit('close');
            this.$emit('newGamme');
          })
          .catch(err => {
            {
              this.$buefy.notification.open({
                message: 'Une erreur est survenue, veuillez réessayer plus tard.',
                type: 'is-danger',
                duration: 3000,
                closable: false,
                autoClose: true
              });
              console.log(err);
              this.$nuxt.$loading.finish()
            }
          });
      }
    },

    checkData: function() {
      let errorExist = false;
      for (const [, data] of Object.entries(this.dataForm)) {
        // If no data supplied in the inputs
        if(!data) {
          errorExist = true;
        } else {
          for(const [, state] of Object.entries(this.dataForm)) {
            if(!state)
              break;
            }
        }
      }
      return errorExist;
    },
  }
}
</script>

<style scoped>

</style>
