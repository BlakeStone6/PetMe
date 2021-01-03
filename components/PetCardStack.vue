<template>
  <div class="cards">
    <PetCard
      v-for="(card, index) in cards"
      :key="index"
      :card="card"
      :is-current="index === 0"
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
  margin: 50px;
  width: 300px;
}
</style>
