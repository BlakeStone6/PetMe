<template>
  <div class="profileCard">
    <vs-card type="1" @click="showProfileDialog">
      <template #title>
        <h3 class="cardTitle">{{ card.fields.nom }}</h3>
      </template>
      <template #img>
        <img
          :src="card.fields.image[0].url"
          :alt="'Profil de ' + card.fields.nom"
        />
      </template>
      <template #text>
        <p>{{ card.fields.description }}</p>
      </template>
    </vs-card>
    <vs-dialog v-model="active" not-close>
      <pet-profile-dialog
        :card="card"
        :is-this-user="isThisUser"
        :refuge="refuge"
      />
    </vs-dialog>
  </div>
</template>

<script>
import PetProfileDialog from '@/components/PetProfileDialog'
export default {
  components: {
    PetProfileDialog,
  },
  props: {
    card: {
      type: Object,
      required: true,
    },
    isThisUser: {
      type: Boolean,
      required: true,
    },
    refuge: {
      type: String,
      required: true,
    },
  },
  data: () => ({
    active: false,
  }),
  methods: {
    showProfileDialog() {
      this.active = !this.active
    },
  },
}
</script>

<style>
.profileCard {
  padding: 0.3em;
  margin: auto;
}
</style>
