<template>
  <div class="container">
    <h1>Se connecter en tant qu'adoptant</h1>
    <div>
      <form @submit.prevent="onLogin">
        <label>
          Email:
          <vs-input v-model="email" type="email" />
        </label>
        <label>
          Mot de passe:
          <vs-input v-model="password" type="password" />
        </label>
        <vs-input type="submit" value="Connexion" />
      </form>
      <p>
        Pas de compte ?
        <nuxt-link to="../register/adoptant">S'enregistrer</nuxt-link>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
    email: '',
    password: '',
  }),

  methods: {
    async onLogin() {
      try {
        const response = await this.$auth.loginWith('local', {
          data: this._data,
        })
        console.log(response)
      } catch (e) {
        console.error(e)
      }
    },
  },
}
</script>

<style></style>
