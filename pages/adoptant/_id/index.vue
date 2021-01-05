<template>
  <div>
    <AdoptantProfile :card="user" :is-this-user="isThisUser" />
    <nuxt-link to="/" class="button--green">Back</nuxt-link>
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

<style></style>
