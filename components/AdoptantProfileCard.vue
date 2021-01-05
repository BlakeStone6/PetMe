<template>
  <div class="profileCard">
    <vs-card type="1" @click="showProfileDialog">
      <template #title>
        <h3 class="cardTitle">
          {{ card.fields.prenom }} {{ card.fields.nom }}
        </h3>
      </template>
      <template #img>
        <img
          :src="card.fields.photo[0].url"
          :alt="'Profil de ' + card.fields.prenom"
        />
      </template>
      <template #text>
        <p>{{ card.fields.bio }}</p>
      </template>
    </vs-card>
    <vs-dialog v-model="active">
      <AdoptantProfile :card="card" :is-this-user="isThisUser" />
    </vs-dialog>
  </div>
</template>

<script>
import AdoptantProfile from '@/components/AdoptantProfile'
export default {
  components: {
    AdoptantProfile,
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
  padding: 1vw;
}
</style>
