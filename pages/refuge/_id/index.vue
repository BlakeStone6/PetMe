<template>
  <div>
    <h1>{{ user.data.nom }}</h1>
    <div v-if="user.data.animaux" class="petList">
      <h2>Liste des animaux</h2>

      <div v-for="(animal, index) in animaux" :key="index">
        <PetProfileCard :card="animal" :is-this-user="isThisUser" />
      </div>
    </div>
    <nuxt-link v-if="isThisUser" :to="$route.params.id + '/edit'">
      Edit
    </nuxt-link>
    <vs-button type="border" @click="logout">Logout</vs-button>
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
  data: () => ({ isThisUser: false }),
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

<style></style>
