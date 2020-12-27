<template>
  <div>
    <h1>S'enregistrer en tant qu'adoptant</h1>
    <form method="post">
      <label>
        Nom:
        <vs-input type="text" v-model="nom" />
      </label>
      <label>
        Prénom:
        <vs-input type="text" v-model="prenom" />
      </label>
      <label>
        Email:
        <vs-input type="email" v-model="email" />
      </label>
      <label>
        Téléphone:
        <vs-input type="tel" v-model="tel" />
      </label>
      <label>
        Mot de passe:
        <vs-input type="password" v-model="password" />
      </label>
      <label>
        Confirmer le mot de passe:
        <vs-input type="password" />
      </label>
      <label>
        Type d'habitation:
        <vs-select placeholder="Choisir..." v-model="habitation">
          <vs-option label="Appartement" value="appartement">
            Appartement
          </vs-option>
          <vs-option label="Maison avec jardin" value="maison avec jardin">
            Maison avec jardin
          </vs-option>
          <vs-option label="Maison sans jardin" value="maison sans jardin">
            Maison sans jardin
          </vs-option>
          <vs-option label="Dortoir" value="dortoir">Dortoir</vs-option>
        </vs-select>
      </label>
      <label>
        Animaux présents (même espàce que celui que vous voulez adopter?):
        <vs-select placeholder="Choisir..." v-model="animauxPresents">
          <vs-option label="Non" value="non"> Non </vs-option>
          <vs-option label="Oui, même espèce" value="oui same">
            Oui, même espèce
          </vs-option>
          <vs-option label="Oui, espèce différente" value="oui different">
            Oui, espèce différente
          </vs-option>
        </vs-select>
      </label>
      <label>
        Nombre d'enfants:
        <vs-input type="number" v-model="nbEnfants" />
      </label>
      <label>
        Expérience avec les animaux:
        <textarea />
      </label>
      <label>
        Bio:
        <textarea />
      </label>
      <vs-input type="submit" value="Continuer" />
    </form>
  </div>
</template>

<script>
export default {
  data: () => ({
    nom: '',
    prenom: '',
    email: '',
    tel: '',
    password: '',
    habitation: '',
    animauxPresents: '',
    nbEnfants: '',
    experience: '',
    bio: '',
  }),
}
</script>
