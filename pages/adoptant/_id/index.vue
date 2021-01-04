<template>
  <div>
    <h1>{{ user.data.prenom }} {{ user.data.nom }}</h1>
    <p>{{ $route.params.id }}</p>

    <nuxt-link :to="$route.params.id + '/edit'">Edit</nuxt-link>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const user = await $axios.$get(`/adoptant/${params.id}`)
    return { user }
  },
}
</script>

<style></style>
