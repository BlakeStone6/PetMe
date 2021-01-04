<template>
  <div class="container">
    <h1>S'enregistrer en tant qu'adoptant</h1>
    <div>
      <form @submit.prevent="onSignup">
        <label>
          Nom:
          <vs-input v-model="nom" type="text" />
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
        <label>
          Expérience avec les animaux:
          <textarea v-model="experience" />
        </label>
        <label>
          Bio:
          <textarea v-model="bio" />
        </label>
        <vs-input type="submit" value="Continuer" />
      </form>
    </div>
  </div>
</template>

<script>
export default {
  auth: false,
  data: () => ({
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
        .post('/refuge/register', {
          ...this._data,
        })
        .then(
          (response) => (window.location.href = '/refuge/' + response.data.id)
        )
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err))
    },
  },
}
</script>

<style></style>
