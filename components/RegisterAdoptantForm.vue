<template>
  <div>
    <header>
      <h1>S'enregistrer en tant qu'adoptant</h1>
    </header>
    <div class="registerForm">
      <form @submit.prevent="onSignup">
        <label>
          Nom:
          <vs-input v-model="nom" type="text" />
        </label>
        <label>
          Photo de profil (url):
          <vs-input v-model="photo[0].url" type="url" />
        </label>
        <label>
          Prénom:
          <vs-input v-model="prenom" type="text" />
        </label>
        <label>
          Email:
          <vs-input v-model="email" type="email" />
        </label>
        <label>
          Téléphone:
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
        <label>
          Type d'habitation:
          <vs-select v-model="habitation" placeholder="Choisir...">
            <vs-option label="Appartement" value="appartement">
              Appartement
            </vs-option>
            <vs-option label="Maison avec jardin" value="maison avec jardin">
              Maison avec jardin
            </vs-option>
            <vs-option label="Maison sans jardin" value="maison sans jardin">
              Maison sans jardin
            </vs-option>
            <vs-option label="Dortoir" value="dortoir">Dortoir</vs-option>
          </vs-select>
        </label>
        <label>
          Animaux présents (même espèce que celui que vous voulez adopter?):
          <vs-select v-model="animauxPresents" placeholder="Choisir...">
            <vs-option label="Non" value="non"> Non </vs-option>
            <vs-option label="Oui, même espèce" value="oui same">
              Oui, même espèce
            </vs-option>
            <vs-option label="Oui, espèce différente" value="oui different">
              Oui, espèce différente
            </vs-option>
          </vs-select>
        </label>
        <label>
          Nombre d'enfants:
          <vs-input v-model.number="nbEnfants" type="number" />
        </label>
        <div>
          <label>
            Expérience avec les animaux:
            <div>
              <textarea v-model="experience" />
            </div>
          </label>
        </div>
        <div>
          <label>
            Bio:
            <div>
              <textarea v-model="bio" />
            </div>
          </label>
        </div>
        <vs-input type="submit" value="Continuer" class="registerButton" />
      </form>
    </div>
  </div>
</template>

<script>
import jwtDecode from 'jwt-decode'
export default {
  auth: 'guest',
  data: () => ({
    photo: [
      {
        url: '',
      },
    ],
    nom: '',
    prenom: '',
    email: '',
    telephone: '',
    password: '',
    habitation: '',
    animauxPresents: '',
    nbEnfants: 0,
    experience: '',
    bio: '',
  }),

  methods: {
    onSignup() {
      this.$axios
        .post('/auth/adoptant/register', {
          ...this._data,
        })
        .then(async (response) => {
          try {
            this.$auth.reset()
            const response = await this.$auth.loginWith('adoptantStrategy', {
              data: { email: this.email, password: this.password },
            })
            const token = jwtDecode(response.data.token)
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
label {
  justify-content: start;
  align-items: center;
}
.registerButton {
  padding: 1em 0;
}
textarea {
  resize: none;
  width: 15em;
  height: 5em;
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgb(75, 137, 194);
  border: 5px solid transparent;
  outline: none;
}
</style>
