
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css:[
    '@/assets/scss/app.scss',
    'vue-final-modal/style.css'
  ],
  modules: ['@element-plus/nuxt'],
  app: {
    baseURL: process.env.NODE_ENV === 'production' ? '/quote/' : '/' ,
    buildAssetsDir: '/static/'
  },
  nitro:{
    prerender:{
      failOnError:false,
    }
  },
  devtools: { enabled: true }
})
