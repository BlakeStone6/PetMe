<template>
  <div>
    <Nuxt />
  </div>
</template>

<style>
html {
  font-family: 'Source Sans Pro', -apple-system, BlinkMacSystemFont, 'Segoe UI',
    Roboto, 'Helvetica Neue', Arial, sans-serif;
  font-size: 16px;
  word-spacing: 1px;
  -ms-text-size-adjust: 100%;
  -webkit-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  box-sizing: border-box;
  background-color: rgb(196, 226, 226);
}
*,
*::before,
*::after {
  box-sizing: border-box;
  margin: 0;
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
  margin: auto;
}
.button--green {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #3b8070;
  color: #3b8070;
  text-decoration: none;
  padding: 10px 30px;
}

.button--green:hover {
  color: #fff;
  background-color: #3b8070;
  cursor: pointer;
}

.button--grey {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #35495e;
  color: #35495e;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--grey:hover {
  color: #fff;
  background-color: #35495e;
  cursor: pointer;
}

.button--red {
  display: inline-block;
  border-radius: 4px;
  border: 1px solid #720000;
  color: #720000;
  text-decoration: none;
  padding: 10px 30px;
  margin-left: 15px;
}

.button--red:hover {
  color: #fff;
  background-color: #720000;
  cursor: pointer;
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

.profile {
  max-width: 50vw;
  margin: auto;
  margin-top: 3vw;
  background-color: #fff;
  border-radius: 25px;
}
</style>
