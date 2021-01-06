<template>
  <div>
    <header>
      <h1>S'enregistrer en tant que refuge</h1>
    </header>
    <div class="registerForm">
      <form @submit.prevent="onSignup">
        <label>
          Nom du refuge:
          <vs-input v-model="nom" type="text" />
        </label>
        <label> RNA: <vs-input v-model="rna" type="text" /> </label>
        <label>
          Nom/prénom du contact:
          <vs-input v-model="contact" type="text" />
        </label>
        <label>
          Email de contact:
          <vs-input v-model="email" type="email" />
        </label>
        <label>
          Téléphone de contact:
          <vs-input v-model="telephone" type="tel" />
        </label>
        <label>
          Mot de passe:
          <vs-input v-model="password" type="password" />
        </label>
        <label>
          Confirmer le mot de passe:
          <vs-input type="password" />
        </label>
        <vs-input type="submit" value="Continuer" class="registerButton" />
      </form>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  auth: false,
  data: () => ({
    nom: '',
    rna: '',
    contact: '',
    email: '',
    telephone: '',
    password: '',
    verified: false,
  }),

  methods: {
    onSignup() {
      this.$axios
        .post('/auth/refuge/register', {
          ...this._data,
        })
        .then(async (response) => {
          try {
            this.$auth.reset()
            const res = await this.$auth.loginWith('refugeStrategy', {
              data: { email: this.email, password: this.password },
            })
            const token = jwtDecode(res.data.token)
            this.$auth.setUser(token.sub)
            window.location.href = '/'
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error(e)
          }
        })
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err))
    },
  },
}
</script>

<style>
.registerForm {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  flex-wrap: wrap;
}
</style>
