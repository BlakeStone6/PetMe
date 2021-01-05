<template>
  <div class="container">
    <div>
      <header></header>
      <h1 class="title">PetMe</h1>
      <h2 class="subtitle">S'enregistrer</h2>
      <div class="links">
        <p
          :style="{ cursor: 'pointer' }"
          class="button--green"
          @click="adoptantActive = !adoptantActive"
        >
          Je suis adoptant
        </p>
        <p
          :style="{ cursor: 'pointer' }"
          class="button--grey"
          @click="refugeActive = !refugeActive"
        >
          Je suis un refuge
        </p>
      </div>
      <vs-dialog v-model="adoptantActive">
        <RegisterAdoptantForm />
      </vs-dialog>
      <vs-dialog v-model="refugeActive">
        <RegisterRefugeForm />
      </vs-dialog>
    </div>
    <div><nuxt-link to="/login">J'ai déjà un compte</nuxt-link></div>
  </div>
</template>

<script>
import RegisterAdoptantForm from '@/components/RegisterAdoptantForm'
import RegisterRefugeForm from '@/components/RegisterRefugeForm'

export default {
  auth: false,
  components: { RegisterAdoptantForm, RegisterRefugeForm },
  data: () => ({
    refugeActive: false,
    adoptantActive: false,
  }),
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 55px;
  color: #35495e;
  letter-spacing: 1px;
  text-transform: capitalize;
  margin: 25px 0;
}

.subtitle {
  font-weight: 300;
  font-size: 1.1rem;
  color: #526488;
  word-spacing: 2px;
  padding-bottom: 15px;
  max-width: 600px;
}

.subtitle a {
  font-weight: 500;
  color: inherit;
}

.links {
  padding-top: 15px;
  margin-bottom: 20px;
}

.content-logos {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 500px;
}

.plus {
  font-size: 2.5rem;
  margin: 15px;
  color: #35495e;
}

.h3 {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-weight: 400;
  margin: 10px;
}
</style>
