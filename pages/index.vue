<template>
  <div class="container">
    <div class="app">
      <header>
        <h1 class="title">PetMe</h1>
        <h2 class="subtitle">We pet you</h2>
      </header>
      <p v-if="$fetchState.pending">Fetching pets...</p>
      <p v-else-if="$fetchState.error">An error occurred :(</p>
      <div>
        <PetCardStack
          :cards="visibleCards"
          @cardAccepted="handleCardAccepted"
          @cardRejected="handleCardRejected"
          @hideCard="removeCardFromDeck"
        />
      </div>
    </div>
    <vs-button type="flat" @click="logout">Log out</vs-button>
  </div>
</template>

<script>
import PetCardStack from '@/components/PetCardStack.vue'

export default {
  middleware: ['is-refuge', 'user'],
  components: { PetCardStack },
  data: () => ({
    visibleCards: [],
  }),

  async fetch() {
    const list = await this.$axios.$get(`/animaux/${this.$auth.user}`)
    this.visibleCards = list.animaux
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      window.location.reload(true)
    },
    async handleCardAccepted() {
      console.log('accepted card ', this.visibleCards[0].fields.nom)
      const like = await this.$axios.post('/animaux/like', {
        userId: this.$auth.id,
        petId: this.visibleCards[0].id,
      })
      console.log(like.data.message)
    },
    async handleCardRejected() {
      console.log('handleCardRejected')
      const skip = await this.$axios.post('/animaux/skip', {
        userId: this.$auth.id,
        petId: this.visibleCards[0].id,
      })
      console.log(skip.data.message)
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
.container {
  margin: auto;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
}

.app {
  margin: auto;
  min-height: 100vh;
  display: flex;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 55px;
  color: #35495e;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin: 25px 0;
}

.subtitle {
  font-weight: 300;
  font-size: 1.1rem;
  color: #526488;
  word-spacing: 2px;
  padding-bottom: 15px;
  max-width: 600px;
}

.subtitle a {
  font-weight: 500;
  color: inherit;
}

.content-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
}

.plus {
  font-size: 2.5rem;
  margin: 15px;
  color: #35495e;
}

.h3 {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  margin: 10px;
}
</style>
