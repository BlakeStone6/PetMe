<template>
  <div class="AddPetForm">
    <form @submit.prevent="onAddPet">
      <label>
        Nom
        <vs-input v-model="nom" type="text" required />
      </label>
      <label>
        Espèce
        <vs-select v-model="espece" placeholder="Choisir" required>
          <vs-option label="chien" value="chien">Chien</vs-option>
          <vs-option label="chat" value="chat">Chat</vs-option>
          <vs-option label="lézard" value="lézard">Lézard</vs-option>
        </vs-select>
      </label>
      <label>
        Races
        <vs-select
          v-model="races"
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
        <vs-select v-model="sexe" placeholder="Choisir..." required>
          <vs-option label="Male" value="male">Mâle</vs-option>
          <vs-option label="Femelle" value="femelle">Femelle</vs-option>
        </vs-select>
      </label>
      <label>
        Taille
        <vs-select v-model="taille" placeholder="Choisir..." required>
          <vs-option label="Petit" value="petit">Petit</vs-option>
          <vs-option label="Moyen" value="moyen">Moyen</vs-option>
          <vs-option label="Grand" value="grand">Grand</vs-option>
        </vs-select>
      </label>
      <label>
        Date de naissance
        <vs-input v-model="dateDeNaissance" type="date" required />
      </label>
      <label>
        Description
        <vs-input v-model="description" type="text" required />
      </label>
      <label>
        Image (url):
        <vs-input v-model="image[0].url" type="url" required />
      </label>
      <h2>Informations médicales</h2>
      <label>
        <vs-checkbox v-model="puce">Pucé</vs-checkbox>
      </label>
      <label>
        <vs-checkbox v-model="vaccin">Vacciné</vs-checkbox>
      </label>
      <label>
        <vs-checkbox v-model="sterilise">Stérilisé</vs-checkbox>
      </label>
      <label>
        Autres informations
        <vs-input v-model="infosMedicales" type="text" required />
      </label>
      <div>
        <vs-input type="submit" value="Continuer" />
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    nom: '',
    image: [{ url: '' }],
    espece: '',
    dateDeNaissance: '',
    sexe: '',
    description: '',
    vaccin: false,
    puce: false,
    sterilise: false,
    infosMedicales: '',
    refuge: [],
    taille: '',
    races: [],
  }),
  methods: {
    onAddPet() {
      this.refuge[0] = this.$auth.user
      this.$axios
        .post('/refuge/addPet', {
          ...this._data,
        })
        .then((window.location.href = '/'))
    },
  },
}
</script>
