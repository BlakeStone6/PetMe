<template>
  <div>
    <h1>{{ user.data.nom }}</h1>
    <p>{{ $route.params.id }}</p>
    <p v-for="(animal, index) in animaux" :key="index">
      {{ animal.fields.nom }}
    </p>
    <nuxt-link :to="$route.params.id + '/edit'">Edit</nuxt-link>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const animaux = []
    const user = await $axios.$get(`/refuge/${params.id}`)
    user.data.animaux.forEach(async (animal) => {
      const pet = await $axios.$get(`/refuge/${params.id}/animal/${animal}`)
      animaux.push(pet.record)
    })
    return { user, animaux }
  },
}
</script>

<style></style>
