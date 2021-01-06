<template>
  <div>
    <AdoptantProfile :card="user" :is-this-user="isThisUser" class="profile" />
    <footer>
      <nuxt-link to="/" class="button--green">Retour</nuxt-link>
    </footer>
  </div>
</template>

<script>
import AdoptantProfile from '~/components/AdoptantProfile.vue'
export default {
  components: { AdoptantProfile },
  async asyncData({ params, $axios }) {
    const user = await $axios.$get(`/adoptant/${params.id}`)
    return { user }
  },
  data: () => ({ isThisUser: false }),
  mounted() {
    this.isThisUser = this.$auth.user === this.$route.params.id
  },
}
</script>

<style>
footer {
  text-align: center;
  padding: 2vw;
}
</style>
