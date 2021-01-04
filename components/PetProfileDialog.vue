<template>
  <div>
    <div class="header-dialog">
      <h1>{{ card.fields.nom }}</h1>
    </div>

    <div class="con-form">
      <img
        :src="card.fields.image[0].url"
        :alt="'Profil de ' + card.fields.nom"
      />
      <div class="flex">
        <h3 class="capitalize">{{ card.fields.espece }}</h3>
        <h4>
          <span
            v-for="(race, index) in card.fields.races"
            :key="race"
            class="capitalize"
          >
            {{ race }}
            <span v-if="index != card.fields.races.length - 1">, </span>
          </span>
        </h4>
      </div>
    </div>

    <div class="footer-dialog">
      <nuxt-link :to="'/likes/' + card.id" class="button--green">
        Voir les profils qui ont liké {{ card.fields.nom }}
      </nuxt-link>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    card: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style>
.header-dialog {
  padding: 1vw;
  text-align: center;
}

.capitalize {
  text-transform: capitalize;
}
img {
  max-width: 100%;
  max-height: 100%;
}
</style>
