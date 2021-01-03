<template>
  <pet-card-stack :cards="visibleCards" />
</template>

<script>
import PetCardStack from '~/components/PetCardStack.vue'
export default {
  auth: false,

  components: { PetCardStack },

  data: () => ({
    visibleCards: [
      {
        keyword: 'ok',
      },
      {
        keyword: 'no',
      },
    ],
  }),
}
</script>

<style></style>
