<template>
  <div>
    <header>
      <h1>Se connecter en tant que refuge</h1>
    </header>
    <div class="loginForm">
      <form @submit.prevent="onLogin">
        <label>
          Email:
          <vs-input v-model="email" type="email">
            <template #icon> @ </template>
          </vs-input>
        </label>
        <label>
          Mot de passe:
          <vs-input v-model="password" type="password">
            <template #icon>
              <i class="bx bxs-lock"></i>
            </template>
          </vs-input>
        </label>
        <vs-input type="submit" value="Connexion" class="loginButton" />
      </form>
    </div>

    <footer>
      <p>
        Pas de compte ?
        <nuxt-link to="../register/refuge">S'enregistrer</nuxt-link>
      </p>
    </footer>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  auth: 'guest',
  data: () => ({
    email: 'potizanimo@gmail.co',
    password: 'popop',
  }),

  methods: {
    async onLogin() {
      try {
        this.$auth.reset()
        const response = await this.$auth.loginWith('refugeStrategy', {
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
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
}

label {
  justify-content: start;
  align-items: center;
}
.loginButton {
  padding: 1em 0;
}

footer {
  text-align: center;
}
</style>
