<template>
  <div>
    <h1>Edit user {{ user.data.prenom }} {{ user.data.nom }}</h1>
    <form @submit.prevent="onSubmit">
      <label>
        Nom:
        <vs-input v-model="user.data.nom" type="text" />
      </label>
      <label>
        Prénom:
        <vs-input v-model="user.data.prenom" type="text" />
      </label>
      <label>
        Email:
        <vs-input v-model="user.data.email" type="email" />
      </label>
      <label> Photo: </label>
      <label>
        Téléphone:
        <vs-input v-model="user.data.telephone" type="tel" />
      </label>
      <label>
        Mot de passe:
        <vs-input v-model="user.data.password" type="password" />
      </label>
      <label>
        Confirmer le mot de passe:
        <vs-input type="password" />
      </label>
      <label>
        Type d'habitation:
        <vs-select v-model="user.data.habitation" placeholder="Choisir...">
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
        <vs-select v-model="user.data.animauxPresents" placeholder="Choisir...">
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
        <vs-input v-model.number="user.data.nbEnfants" type="number" />
      </label>
      <label>
        Expérience avec les animaux:
        <textarea v-model="user.data.experience" />
      </label>
      <label>
        Bio:
        <textarea v-model="user.data.bio" />
      </label>
      <vs-input type="submit" value="Continuer" />
    </form>
  </div>
</template>

<script>
export default {
  middleware: 'is-this-user',
  async asyncData({ params, $axios }) {
    // console.log(params)
    const user = await $axios.$get(`/adoptant/${params.id}`)
    // console.log(user)
    return { user }
  },

  methods: {
    onSubmit() {
      this.$axios
        .put(`/adoptant/${this.$route.params.id}`, {
          ...this._data.user.data,
        })
        .then(
          (response) => (window.location.href = '/adoptant/' + response.data.id)
        )
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err))

      // console.log(this._data)
    },
  },
}
</script>

<style></style>
