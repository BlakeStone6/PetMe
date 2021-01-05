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
        <h3 class="capitalize">
          {{ card.fields.espece }}, {{ getAge(card.fields.dateDeNaissance) }},
          <span v-if="card.fields.sexe === 'male'">M</span>
          <span v-else>F</span>
        </h3>
        <h4>
          <span class="capitalize">{{ card.fields.taille }} - </span>
          <span
            v-for="(race, index) in card.fields.races"
            :key="race"
            class="capitalize"
          >
            {{ race }}
            <span v-if="index != card.fields.races.length - 1">, </span>
          </span>
        </h4>
        <h4>Description:</h4>
        <p>{{ card.fields.description }}</p>

        <h4>Informations médicales:</h4>
        <p>
          Pucé:
          <span v-if="card.fields.puce">
            <i class="bx bx-check"></i>
          </span>
          <span v-else>
            <i class="bx bx-x"></i>
          </span>
        </p>
        <p>
          Vacciné:
          <span v-if="card.fields.vaccin">
            <i class="bx bx-check"></i>
          </span>
          <span v-else>
            <i class="bx bx-x"></i>
          </span>
        </p>
        <p>
          Stérilisé:
          <span v-if="card.fields.sterilise">
            <i class="bx bx-check"></i>
          </span>
          <span v-else>
            <i class="bx bx-x"></i>
          </span>
        </p>
        <p v-if="card.fields.infosMedicales">
          <b>Informations additionnelles : </b>
          {{ card.fields.infosMedicales }}
        </p>
      </div>
    </div>

    <div v-if="isThisUser" class="footer-dialog">
      <nuxt-link :to="refuge + '/likes/' + card.id" class="button--green">
        Voir les profils qui ont liké {{ card.fields.nom }}
      </nuxt-link>
      <nuxt-link :to="refuge + '/edit/' + card.id" class="button--grey">
        Editer le profil de {{ card.fields.nom }}
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
    refuge: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    getAge(dateString) {
      console.log(this.card)
      const today = new Date()
      const birthDate = new Date(dateString)
      let age = today.getFullYear() - birthDate.getFullYear()
      const m = today.getMonth() - birthDate.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
        age--
      }
      return age
    },
  },
}
</script>

<style>
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
