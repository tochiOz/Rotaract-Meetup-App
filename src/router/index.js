import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import createMeetup from '@/components/meetup/createMeetup'
import meetup from '@/components/meetup/meetup'
import signIn from '@/components/user/signIn'
import signUp from '@/components/user/signUp'
import meet from '@/components/meetup/meet'
import Vuetify from 'vuetify'
import AuthGuard from './auth-guard'
 
Vue.use(Vuetify)
Vue.use(Router)

export default new Router({

  mode: 'history',
  
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/meetup/new',
      name: 'CreateMeetup',
      component: createMeetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/meetup/:id',
      name: 'MeetUp',
      props: true,
      component: meet
    },
    {
      path: '/meetup',
      name: 'Meetups',
      component: meetup,
      beforeEnter: AuthGuard
    },
    {
      path: '/signIn',
      name: 'SignIn',
      component: signIn
    },
    {
      path: '/signUp',
      name: 'SignUp',
      component: signUp
    }
  ]
})
