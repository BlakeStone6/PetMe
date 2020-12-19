# PetMe

PetMe est une application web progressive (PWA) qui permet aux utilisateurs de choisir un animal à adopter, et aux refuges de choisir un futur maître pour leurs animaux.

## Fabriqué avec

- [JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript) - Langage de programmation
- [Node.js](https://nodejs.org/en/) - Environnement d'execution JavaScript
- [Express.js](https://expressjs.com/fr/) - Infrastructure web
- [Vue.js](https://vuejs.org/) - Framework (front-end)
- [Nuxt.js](https://fr.nuxtjs.org/) - Framework (basé sur Vue.js)
- [Vuesax](https://vuesax.com/) - UI Framework
- [Firebase](https://firebase.google.com/docs) - Base de données
- [Visual Studio Code](https://code.visualstudio.com/) - Environnement de développement

## Fonctionnement

L'application est basée sur le fonctionnement de sites de rencontres. Les utilisateurs doivent se créer un profil et renseigner des critères de recherche ainsi que certains informations personelles telles que: le lieu d'habitat, leur statut etc (Sont-ils déjà propriétaire d'un animal ? Ont-ils des enfants ?).
Ils seront ensuite amenés à choisir parmi des profils d'animaux en refuge selon les critères établis auparavant.

Une fois cette sélection faite, les refuges peuvent à leur tour choisir entre les différents candidats pour chaque animal (suivant les informations communiquées sur leur profil), et les contacter via un système de messagerie instantannée.

## Auteurs

- **Jérémi Friggit** _alias_ [@KorabFusian](https://github.com/KorabFusian)
- **Zoé Niddam** _alias_ [@BlakeStone6](https://github.com/BlakeStone6)

## Licence

Ce projet est sous licence [MIT](https://choosealicense.com/licenses/mit/)

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:3000
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

For detailed explanation on how things work, check out [Nuxt.js docs](https://nuxtjs.org).
