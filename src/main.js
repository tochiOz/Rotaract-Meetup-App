// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import dateFilter from './filter/date'

Vue.config.productionTip = false
import 'vuetify/dist/vuetify.min.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import { store } from './store/store'
import * as firebase from 'firebase'

Vue.filter('date', dateFilter)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({
      apiKey: 'AIzaSyAVpGDFUjXZYECJXctRg58_OsAtNrtVhOs',
      authDomain: 'rotaract-meetup-app.firebaseapp.com',
      databaseURL: 'https://rotaract-meetup-app.firebaseio.com',
      projectId: 'rotaract-meetup-app',
      storageBucket: 'rotaract-meetup-app.appspot.com',
    })
  }
})
