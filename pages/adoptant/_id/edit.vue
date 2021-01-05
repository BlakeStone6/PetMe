<template>
  <div>
    <h1>Edit user {{ user.fields.prenom }} {{ user.fields.nom }}</h1>
    <form @submit.prevent="onSubmit">
      <label>
        Nom:
        <vs-input v-model="user.fields.nom" type="text" />
      </label>
      <label>
        Prénom:
        <vs-input v-model="user.fields.prenom" type="text" />
      </label>
      <label>
        Email:
        <vs-input v-model="user.fields.email" type="email" />
      </label>
      <label>
        URL de la photo:
        <vs-input v-model="user.fields.photo[0].url" type="url" />
      </label>
      <label>
        Téléphone:
        <vs-input v-model="user.fields.telephone" type="tel" />
      </label>
      <label>
        Mot de passe:
        <vs-input v-model="user.fields.password" type="password" />
      </label>
      <label>
        Confirmer le mot de passe:
        <vs-input type="password" />
      </label>
      <label>
        Type d'habitation:
        <vs-select v-model="user.fields.habitation" placeholder="Choisir...">
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
        <vs-select
          v-model="user.fields.animauxPresents"
          placeholder="Choisir..."
        >
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
        <vs-input v-model.number="user.fields.nbEnfants" type="number" />
      </label>
      <label>
        Expérience avec les animaux:
        <textarea v-model="user.fields.experience" />
      </label>
      <label>
        Bio:
        <textarea v-model="user.fields.bio" />
      </label>
      <vs-input type="submit" value="Continuer" />
    </form>
    <nuxt-link :to="'/adoptant/' + $route.params.id" class="button--green">
      Retour au profil
    </nuxt-link>
  </div>
</template>

<script>
export default {
  middleware: ['is-this-user', 'user'],
  async asyncData({ params, $axios }) {
    // console.log(params)
    const user = await $axios.$get(`/adoptant/${params.id}`)
    return { user }
  },
  data: () => ({
    photo: [
      {
        url: '',
      },
    ],
  }),

  computed: {
    /* The FormData : Here We Make A Form With Images Data To Submit. */
    form() {
      const form = new FormData()

      this.photo.forEach((file, index) => {
        form.append('files[' + index + ']', file)
      })

      return form
    },
  },

  methods: {
    onSubmit() {
      if (this.user.fields.password === '') delete this.user.fields.password
      this.photo[0].url = this.user.fields.photo[0].url
        .put(`/adoptant/${this.$route.params.id}`, {
          ...this._data.user.fields,
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

<style>
label {
  display: block;
}
textarea {
  display: block;
  resize: none;
  max-width: 15em;
  max-height: 5em;
  border-radius: 10px;
  box-shadow: 0 0 0 1px rgb(75, 137, 194);
  border: 5px solid transparent;
  outline: none;
}
.custom-file {
  padding: 1.2rem;
  border-radius: 0.8rem;
  display: inline-block;
  border: 2px dashed #a0a0a0;
}

.custom-file input {
  display: none;
}
</style>
