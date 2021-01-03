export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,

  // Global page headers (https://go.nuxtjs.dev/config-head)
  head: {
    title: 'pet-me',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['vuesax/dist/vuesax.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: ['@/plugins/vuesax'],

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: true,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module',
    // .env
    '@nuxtjs/dotenv',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    // https://auth.nuxtjs.org
    '@nuxtjs/auth',
    // https://go.nuxtjs.dev/pwa
    '@nuxtjs/pwa',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL: 'http://localhost:3000/api',
  },

  // Auth configuration

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},

  router: {
    middleware: ['auth'],
  },

  serverMiddleware: [
    {
      path: '/api',
      handler: '~/api/index.js',
    },
  ],

  auth: {
    strategies: {
      adoptantStrategy: {
        scheme: 'local',
        token: {
          property: 'token',
          // required: true,
          // type: 'Bearer',
        },
        user: {
          property: 'sub',
          // autoFetch: true,
        },
        endpoints: {
          login: { url: '/api/adoptant/login', method: 'post' },
          logout: { url: '/api/adoptant/logout', method: 'post' },
          user: { url: '/api/adoptant/', method: 'get' },
        },
      },
    },
  },

  env: {
    jwtSecret: process.env.JWT_SECRET,
  },
}
