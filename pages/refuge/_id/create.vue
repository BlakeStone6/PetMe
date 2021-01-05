<template>
  <div class="container">
    <div>
      <header>
        <h1 class="title">Enregistrer une fiche animal</h1>
      </header>
      <add-pet-form />
    </div>
  </div>
</template>

<script>
import AddPetForm from '@/components/AddPetForm'
export default {
  components: { AddPetForm },
}
</script>
