<template>
  <div>
    <h1>Profils qui ont liké {{ petName }}</h1>
    <div v-for="adoptant in adoptants" :key="adoptant">
      <adoptant-profile-card
        :card="adoptant"
        :is-this-user="false"
        :refuge="$route.params.id"
      />
    </div>
    <nuxt-link :to="'/refuge/' + $route.params.id" class="button--green">
      Retour au profil
    </nuxt-link>
  </div>
</template>

<script>
import AdoptantProfileCard from '~/components/AdoptantProfileCard.vue'
export default {
  components: { AdoptantProfileCard },
  async asyncData({ params, $axios }) {
    // console.log(params)
    const adoptants = []
    const pet = await $axios.$get(`/refuge/${params.id}/animal/${params.petID}`)
    const petName = pet.record.fields.nom
    pet.record.fields.likedBy.forEach(async (id) => {
      const newAdoptant = await $axios.$get(`/adoptant/${id}`)
      adoptants.push(newAdoptant)
    })
    return { petName, adoptants }
  },
}
</script>

<style></style>
