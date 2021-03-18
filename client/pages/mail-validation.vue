<template>
  <div>
    {{message}}
  </div>
</template>

<script>
export default {
  name: "mail-validation",
  data() {
    return {
      message: "Validation en cours..."
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()
    });
    this.$axios.$put(`http://localhost:3000/user/validate?qid=${this.$route.query.qid}`)
    .then(res => {
      this.message = "Compte validé ! Vous pouvez dorénavant vous connecté !";
      this.$buefy.notification.open({
        message: `${res.message}`,
        type: 'is-success',
        duration: 3000,
        closable: false,
        autoClose: true
      });
    })
    .catch(e => {
      this.message = "Veuillez réessayer de valider votre compte..";
      this.$buefy.notification.open({
        message: `${e.message}`,
        type: 'is-danger',
        duration: 3000,
        closable: false,
        autoClose: true
      });
    })
    .finally(() => {
      this.$nuxt.$loading.finish();
    })
  }
}
</script>

<style scoped>

</style>
