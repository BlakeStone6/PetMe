<template>
  <div class="profile">
    <div class="header-dialog">
      <h1>{{ card.fields.prenom }} {{ card.fields.nom }}</h1>
    </div>

    <div class="con-form">
      <img
        :src="card.fields.photo[0].url"
        :alt="'Profil de ' + card.fields.nom"
      />
      <div class="flex">
        <h4>Description:</h4>
        <p>{{ card.fields.bio }}</p>
        <h4>Expérience avec les animaux:</h4>
        <p>{{ card.fields.experience }}</p>
        <p>
          <b>Animaux présents :</b>
          <span v-if="card.fields.animauxPresents === 'non'">Aucun</span>
          <span v-if="card.fields.animauxPresents === 'oui same'">
            Oui, de la même espèce que ceux recherchés
          </span>
          <span v-if="card.fields.animauxPresents === 'oui different'">
            Oui, d'une espèce différente de ceux recherchés
          </span>
        </p>
        <p>
          <b>Habitation:</b>
          <span class="capitalize">{{ card.fields.habitation }}</span>
        </p>
        <p v-if="card.fields.nbEnfants">
          <b>Enfants: </b>{{ card.fields.nbEnfants }}
        </p>
      </div>
    </div>

    <div v-if="isThisUser" class="footer-dialog">
      <nuxt-link :to="$auth.user + '/edit'" class="button--grey">
        Editer le profil de {{ card.fields.prenom }} {{ card.fields.nom }}
      </nuxt-link>
    </div>
    <div v-else class="footer-dialog">
      <h3>Contacter {{ card.fields.prenom }}</h3>
      <p><i class="bx bx-phone"></i>{{ card.fields.telephone }}</p>
      <p><i class="bx bx-envelope"></i>{{ card.fields.email }}</p>
    </div>
  </div>
</template>

<script>
export default {
  middleware: ['user'],
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
}
</script>

<style></style>
