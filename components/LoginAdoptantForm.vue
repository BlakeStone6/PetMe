<template>
  <div class="loginForm">
    <h1>Se connecter en tant qu'adoptant</h1>
    <div>
      <form @submit.prevent="onLogin">
        <label>
          Email:
          <vs-input v-model="email" type="email">
            <template #icon> @ </template></vs-input
          >
        </label>
        <label>
          Mot de passe:
          <vs-input v-model="password" type="password">
            <template #icon>
              <i class="bx bxs-lock"></i>
            </template>
          </vs-input>
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
import jwtDecode from 'jwt-decode'
export default {
  auth: 'guest',
  data: () => ({
    email: 'getintherobot@shin.ji',
    password: 'no',
  }),

  methods: {
    async onLogin() {
      try {
        this.$auth.reset()
        const response = await this.$auth.loginWith('adoptantStrategy', {
          data: this._data,
        })
        const token = jwtDecode(response.data.token)
        this.$auth.setUser(token.sub)
        window.location.href = '/'
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e)
      }
    },
  },
}
</script>

<style>
.loginForm {
  align-content: center;
}
</style>
