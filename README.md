# PetMe

PetMe est une application web progressive (PWA) qui permet aux utilisateurs de choisir un animal à adopter, et aux refuges de choisir un futur maître pour leurs animaux.

## Fabriqué avec

- [JavaScript](https://developer.mozilla.org/fr/docs/Web/JavaScript) - Langage de programmation
- [Node.js](https://nodejs.org/en/) - Environnement d'execution JavaScript
- [Express.js](https://expressjs.com/fr/) - Infrastructure web
- [Vue.js](https://vuejs.org/) - Framework (front-end)
- [Nuxt.js](https://fr.nuxtjs.org/) - Framework (basé sur Vue.js)
- [Vuesax](https://vuesax.com/) - UI Framework
- [Airtable](https://https://airtable.com/) - Base de données
- [Visual Studio Code](https://code.visualstudio.com/) - Environnement de développement

## Fonctionnement

L'application est basée sur le fonctionnement de sites de rencontres. Les utilisateurs doivent se créer un profil et renseigner des critères de recherche ainsi que certains informations personelles telles que: le lieu d'habitat, leur statut, etc. (Sont-ils déjà propriétaire d'un animal ? Ont-ils des enfants ?).
Ils seront ensuite amenés à choisir parmi des profils d'animaux en refuge selon les critères de recherche établis auparavant.

Une fois cette sélection faite, les refuges peuvent à leur tour choisir entre les différents candidats pour chaque animal (suivant les informations communiquées sur leur profil), et les contacter via un système de messagerie instantanée.

## MVP

Le Minimum Valuable Product (à créer pour le 6 janvier 2021) est donc une application web où les utilisateurs se créent un profil en tant qu'adoptants, et peuvent tout de suite choisir parmi les profils d'animaux. L'interface de cette sélection est basée sur l'interface d'applications de rencontre comme Tinder : l'utilisateur voit une carte avec le profil de l'animal, et peut la swiper à droite pour "like", ou à gauche pour "skip".

Les refuges eux, peuvent s'enregistrer (la vérification de la validité du refuge n'étant pas une fonction nécessaire pour le moment), et créer des profils d'animaux, qui vont être visibles par les adoptants. Ils peuvent aussi consulter la liste de leurs animaux, et voir le profil des utilisateurs qui ont liké un animal en particulier, et donc leurs informations de contact.

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
