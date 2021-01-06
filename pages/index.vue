<template>
  <div class="container">
    <div class="app">
      <header>
        <h1 class="title">PetMe</h1>
        <h2 class="subtitle">We pet you</h2>
      </header>
      <div v-if="$fetchState.pending" ref="loading"></div>
      <p v-else-if="$fetchState.error">An error occurred :(</p>
      <div class="cardstack">
        <PetCardStack
          :cards="visibleCards"
          @cardAccepted="handleCardAccepted"
          @cardRejected="handleCardRejected"
          @hideCard="removeCardFromDeck"
        />
      </div>
    </div>
    <footer>
      <nuxt-link :to="'/adoptant/' + $auth.user" class="button--grey">
        Mon profil
      </nuxt-link>
      <p class="button--red" type="flat" @click="logout">Déconnexion</p>
    </footer>
  </div>
</template>

<script>
import PetCardStack from '@/components/PetCardStack.vue'

export default {
  middleware: ['is-refuge', 'user'],
  components: { PetCardStack },

  async fetch() {
    const loading = this.$vs.loading({
      target: this.$refs.loading,
      opacity: 1,
      color: '#fc0384',
      text: 'Loading...',
    })
    const list = await this.$axios.$get(`/animaux/${this.$auth.user}`)
    this.visibleCards = list.animaux
    loading.close()
  },
  data: () => ({
    visibleCards: [],
  }),
  methods: {
    async logout() {
      await this.$auth.logout()
      window.location.reload(true)
    },
    async handleCardAccepted() {
      await this.$axios.post('/animaux/like', {
        userId: this.$auth.user,
        petId: this.visibleCards[0].id,
      })
    },
    async handleCardRejected() {
      await this.$axios.post('/animaux/reject', {
        userId: this.$auth.user,
        petId: this.visibleCards[0].id,
      })
    },
    removeCardFromDeck() {
      this.visibleCards.shift()
    },
    printStack() {},
  },
}
</script>

<style lang="scss">
@import './styles/mixins.scss';
</style>

<style>
.app {
  margin: auto;
  min-height: 80vh;
  text-align: center;
}

.cardstack {
  padding: 8em;
  margin: auto;
  display: block;
}

footer {
  text-align: center;
  margin: auto;
}
</style>
