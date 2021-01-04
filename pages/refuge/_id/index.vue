<template>
  <div>
    <h1>{{ user.data.nom }}</h1>
    <p>{{ $route.params.id }}</p>
    <p v-for="(animal, index) in animaux" :key="index">
      {{ animal.fields.nom }}
    </p>
    <nuxt-link v-if="isThisUser" :to="$route.params.id + '/edit'"
      >Edit</nuxt-link
    >
    <vs-button type="border" @click="logout">Logout</vs-button>
  </div>
</template>

<script>
export default {
  middleware: 'user',
  data: () => ({ isThisUser: false }),
  async asyncData({ params, $axios }) {
    const animaux = []
    const user = await $axios.$get(`/refuge/${params.id}`)
    user.data.animaux.forEach(async (animal) => {
      const pet = await $axios.$get(`/refuge/${params.id}/animal/${animal}`)
      animaux.push(pet.record)
    })
    return { user, animaux }
  },
  mounted() {
    this.isThisUser = this.$auth.user === this.$route.params.id
    console.log(this.$auth.user)
    console.log(this.isThisUser)
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
