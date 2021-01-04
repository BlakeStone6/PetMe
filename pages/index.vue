<template>
  <div class="container">
    <div class="app">
      <header></header>
      <h1 class="title">PetMe</h1>
      <h2 class="subtitle">We pet you</h2>
      <PetCardStack
        :cards="visibleCards"
        @cardAccepted="handleCardAccepted"
        @cardRejected="handleCardRejected"
        @hideCard="removeCardFromDeck"
      />
    </div>
    <vs-button type="flat" @click="logout">Log out</vs-button>
  </div>
</template>

<script>
import PetCardStack from '@/components/PetCardStack.vue'

export default {
  middleware: ['is-refuge', 'user'],
  components: { PetCardStack },

  async asyncData({ params, $axios }) {
    const list = await $axios.$get('/animaux/')
    const visibleCards = list.animaux
    return { visibleCards }
  },
  methods: {
    async logout() {
      await this.$auth.logout()
      window.location.reload(true)
    },
    handleCardAccepted() {
      console.log('accepted card ', this.visibleCards[0].keyword)
    },
    handleCardRejected() {
      console.log('handleCardRejected')
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
  margin: 0 auto;
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

.links {
  padding-top: 15px;
  margin-bottom: 20px;
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
