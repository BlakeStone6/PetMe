<template>
  <div class="profile">
    <h1 class="title">{{ user.data.nom }}</h1>
    <div v-if="user.data.animaux" class="petList">
      <div v-for="(animal, index) in animaux" :key="index">
        <PetProfileCard
          :card="animal"
          :is-this-user="isThisUser"
          :refuge="$route.params.id"
          class="profile"
        />
      </div>
    </div>
    <p
      :style="{ cursor: 'pointer' }"
      class="button--green"
      @click="animalForm = !animalForm"
    >
      Ajouter un animal
    </p>
    <nuxt-link
      v-if="isThisUser"
      :to="$route.params.id + '/edit'"
      class="button--grey"
    >
      Modifier le profil refuge
    </nuxt-link>
    <vs-button type="border" @click="logout">Logout</vs-button>
    <vs-dialog v-model="animalForm">
      <header>
        <h1 class="title">Enregistrer une fiche animal</h1>
      </header>
      <add-pet-form
    /></vs-dialog>
  </div>
</template>

<script>
import PetProfileCard from '~/components/PetProfileCard.vue'
export default {
  components: { PetProfileCard },
  middleware: ['user'],
  async asyncData({ params, $axios }) {
    const animaux = []
    const user = await $axios.$get(`/refuge/${params.id}`)
    if (user.data.animaux)
      user.data.animaux.forEach(async (animal) => {
        const pet = await $axios.$get(`/refuge/${params.id}/animal/${animal}`)
        animaux.push(pet.record)
      })
    return { user, animaux }
  },
  data: () => ({ isThisUser: false, animalForm: false }),
  mounted() {
    this.isThisUser = this.$auth.user === this.$route.params.id
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      window.location.reload(true)
    },
  },
}
</script>

<style>
.profile {
  margin: auto;
}

footer {
  text-align: center;
}
</style>
