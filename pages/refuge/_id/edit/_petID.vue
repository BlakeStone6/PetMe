<template>
  <div class="AddPetForm">
    <h1>Edit {{ pet.fields.nom }}</h1>
    <form @submit.prevent="onAddPet">
      <label>
        Nom
        <vs-input v-model="pet.fields.nom" type="text" required />
      </label>
      <label>
        Espèce
        <vs-select v-model="pet.fields.espece" placeholder="Choisir" required>
          <vs-option label="chien" value="chien">Chien</vs-option>
          <vs-option label="chat" value="chat">Chat</vs-option>
          <vs-option label="lézard" value="lézard">Lézard</vs-option>
        </vs-select>
      </label>
      <label>
        Races
        <vs-select
          v-model="pet.fields.races"
          filter
          multiple
          placeholder="Choisir..."
          required
        >
          <vs-option label="inconnu" value="inconnu">Inconnu</vs-option>
          <vs-option label="hyène" value="hyène">Hyène</vs-option>
          <vs-option label="chihuahua" value="chihuahua">Chihuahua</vs-option>
          <vs-option label="bouvier bernois" value="bouvier bernois"
            >Bouvier bernois</vs-option
          >
          <vs-option label="siamois" value="siamois">Siamois</vs-option>
          <vs-option label="berger allemand" value="berger allemand"
            >Berger allemand</vs-option
          >
        </vs-select>
      </label>
      <label>
        Sexe
        <vs-select v-model="pet.fields.sexe" placeholder="Choisir..." required>
          <vs-option label="Male" value="male">Mâle</vs-option>
          <vs-option label="Femelle" value="femelle">Femelle</vs-option>
        </vs-select>
      </label>
      <label>
        Taille
        <vs-select
          v-model="pet.fields.taille"
          placeholder="Choisir..."
          required
        >
          <vs-option label="Petit" value="petit">Petit</vs-option>
          <vs-option label="Moyen" value="moyen">Moyen</vs-option>
          <vs-option label="Grand" value="grand">Grand</vs-option>
        </vs-select>
      </label>
      <label>
        Date de naissance
        <vs-input v-model="pet.fields.dateDeNaissance" type="date" required />
      </label>
      <label>
        Description
        <vs-input v-model="pet.fields.description" type="text" required />
      </label>
      <label>
        Image (url):
        <vs-input v-model="pet.fields.image[0].url" type="url" required />
      </label>
      <h2>Informations médicales</h2>
      <label>
        <vs-checkbox v-model="pet.fields.puce">Pucé</vs-checkbox>
      </label>
      <label>
        <vs-checkbox v-model="pet.fields.vaccin">Vacciné</vs-checkbox>
      </label>
      <label>
        <vs-checkbox v-model="pet.fields.sterilise">Stérilisé</vs-checkbox>
      </label>
      <label>
        Autres informations
        <vs-input v-model="pet.fields.infosMedicales" type="text" required />
      </label>
      <div>
        <vs-input type="submit" value="Continuer" />
      </div>
    </form>
    <nuxt-link :to="'/refuge/' + $route.params.id" class="button--green">
      Retour au profil
    </nuxt-link>
  </div>
</template>

<script>
export default {
  async asyncData({ params, $axios }) {
    const response = await $axios.$get(
      `/refuge/${params.id}/animal/${params.petID}`
    )
    const pet = response.record
    return { pet }
  },
  data: () => ({
    refuge: [],
  }),
  methods: {
    onAddPet() {
      this.refuge[0] = this.$auth.user
      const id = this.pet.id
      const fields = this.pet.fields
      this.$axios.put('/animaux/pet', {
        id,
        fields,
      })
      // .then(window.location.href = '/')
    },
  },
}
</script>
