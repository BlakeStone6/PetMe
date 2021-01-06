<template>
  <div class="cards">
    <pet-card
      v-for="(card, index) in cards"
      :key="card"
      :card="card"
      :is-current="index === 0"
      @cardAccepted="$emit('cardAccepted')"
      @cardRejected="$emit('cardRejected')"
      @cardSkipped="$emit('cardSkipped')"
      @hideCard="$emit('hideCard')"
    />
  </div>
</template>

<script>
import PetCard from '@/components/PetCard'
export default {
  components: {
    PetCard,
  },
  props: {
    cards: {
      type: Array,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped>
.cards {
  position: relative;
  display: flex;
  margin: auto;
  width: 300px;
}
</style>
