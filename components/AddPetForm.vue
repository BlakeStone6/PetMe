<template>
  <div class="AddPetForm">
    <form @submit.prevent="onAddPet">
      <label>
        Nom
        <vs-input v-model="nom" type="text" required />
      </label>
      <label>
        Espèce
        <vs-input v-model="espece" type="text" required />
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
          <vs-option label="inconnu" value="1">Inconnu</vs-option>
          <vs-option label="hyène" value="2">Hyène</vs-option>
          <vs-option label="chihuahua" value="3">Chihuahua</vs-option>
          <vs-option label="bouvier bernois" value="4"
            >Bouvier bernois</vs-option
          >
          <vs-option label="siamois" value="5">Siamois</vs-option>
          <vs-option label="berger allemand" value="6"
            >Berger allemand</vs-option
          >
        </vs-select>
      </label>
      <label>
        Sexe
        <vs-select v-model="sexe" placeholder="Choisir..." required>
          <vs-option label="Male" value="Male">Mâle</vs-option>
          <vs-option label="Femelle" value="Femelle">Femelle</vs-option>
        </vs-select>
      </label>
      <label>
        Taille
        <vs-select v-model="taille" placeholder="Choisir..." required>
          <vs-option label="Petit" value="Petit">Petit</vs-option>
          <vs-option label="Moyen" value="Moyen">Moyen</vs-option>
          <vs-option label="Grand" value="Grand">Grand</vs-option>
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
        Image
        <vs-input v-model="image" type="url" required />
      </label>
      <h2>Informations médicales</h2>
      <label>
        <vs-checkbox v-model="puce" required>Pucé</vs-checkbox>
      </label>
      <label>
        <vs-checkbox v-model="vaccin" required>Vacciné</vs-checkbox>
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
    image: '',
    espece: '',
    dateDeNaissance: '',
    sexe: '',
    description: '',
    vaccin: false,
    puce: false,
    infosMedicales: '',
    refuge: '',
    taille: '',
    races: [],
  }),
  methods: {
    onAddPet() {
      this.refuge = this.$auth.user
      this.$axios
        .post('/auth/adoptant/addPet', {
          ...this._data,
        })
        .then((window.location.href = '/'))
    },
  },
}
</script>
