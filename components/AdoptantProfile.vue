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
        <p><b>Habitation:</b></p>
      </div>
    </div>

    <div v-if="isThisUser" class="footer-dialog">
      <nuxt-link :to="$auth.user + '/edit'" class="button--grey">
        Editer le profil de {{ card.fields.prenom }} {{ card.fields.nom }}
      </nuxt-link>
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

<style>
.profile {
  max-width: 50vw;
}

.header-dialog,
.footer-dialog {
  padding: 1em;
  text-align: center;
}

.con-form {
  padding: 1em;
}

.capitalize {
  text-transform: capitalize;
}

img {
  max-width: 100%;
  max-height: 100%;
}

vs-button {
  display: inline;
}
</style>
