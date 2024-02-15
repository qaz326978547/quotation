// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css:[
    '@/assets/scss/app.scss',
    'vue-final-modal/style.css'
  ],
  modules: ['@element-plus/nuxt'],
  devtools: { enabled: true }
})
