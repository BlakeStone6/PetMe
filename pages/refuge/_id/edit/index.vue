<template>
  <div class="profile">
    <h1 class="title">Editer {{ user.data.nom }}</h1>
    <form class="editForm" @submit.prevent="onSubmit">
      <label>
        Nom du refuge:
        <vs-input v-model="user.data.nom" type="text" />
      </label>
      <label> RNA: <vs-input v-model="user.data.rna" type="text" /> </label>
      <label>
        Nom/prénom du contact:
        <vs-input v-model="user.data.contact" type="text" />
      </label>
      <label>
        Email de contact:
        <vs-input v-model="user.data.email" type="email" />
      </label>
      <label>
        Téléphone de contact:
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
      <vs-input type="submit" value="Continuer" class="submit" />
    </form>
    <footer>
      <nuxt-link :to="'/refuge/' + $route.params.id" class="button--green">
        Retour au profil
      </nuxt-link>
    </footer>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const user = await $axios.$get(`/refuge/${params.id}`)
    return { user }
  },

  methods: {
    onSubmit() {
      this.$axios
        .put(`/refuge/${this.$route.params.id}`, {
          ...this._data.user.data,
        })
        .then(
          (response) => (window.location.href = '/refuge/' + response.data.id)
        )
        // eslint-disable-next-line no-console
        .catch((err) => console.error(err))

      // console.log(this._data)
    },
  },
}
</script>

<style>
.editForm {
  padding: 1em 0 0 2em;
}

.submit {
  padding-top: 2em;
}

footer {
  text-align: center;
}
</style>
