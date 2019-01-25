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
import EditMeetup from "@/components/meetup/edit/editMeetup"
import EditDate from "@/components/meetup/edit/editDate"
import EditTime from "@/components/meetup/edit/editTime"
import RegisterMeetup from "@/components/meetup/register/registeredMeetup"

Vue.filter('date', dateFilter)
Vue.component('app-edit', EditMeetup)
Vue.component('app-date', EditDate)
Vue.component('app-time', EditTime)
Vue.component('app-reg', RegisterMeetup)
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    firebase.initializeApp({//used to load firebase to the app
      apiKey: 'AIzaSyAVpGDFUjXZYECJXctRg58_OsAtNrtVhOs',
      authDomain: 'rotaract-meetup-app.firebaseapp.com',
      databaseURL: 'https://rotaract-meetup-app.firebaseio.com',
      projectId: 'rotaract-meetup-app',
      storageBucket: 'gs://rotaract-meetup-app.appspot.com',
    })
    //when the user is sign in, the following ensures that, the user remains signed in until the logout button is clicked
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        //this enables autoSign in of a registered user into his or her account
        this.$store.dispatch('autoSignIn', user)
        //also we can fetch the user state over here
        this.$store.dispatch('fetchUserState')
      }
    })
    //this is used to load the data created on local to the firebase databse
    this.$store.dispatch('loadMeetups')
  }
})
