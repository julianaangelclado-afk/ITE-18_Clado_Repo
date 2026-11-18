// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  css: ['~/assets/css/main.css'],
  app: {
    head: {
      title: 'Ashford Academy | Student Directory',
      meta: [
        { name: 'description', content: 'A student information website built with reusable Vue components.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        {
          rel: 'stylesheet',
          href: 'https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;0,600;0,700;1,500&family=Spectral:ital,wght@0,400;0,500;1,400&display=swap'
        }
      ]
    }
  }
})
