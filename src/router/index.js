import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import createMeetup from '@/components/meetup/createMeetup'
import meetup from '@/components/meetup/meetup'
import profile from '@/components/user/profile'
import signIn from '@/components/user/signIn'
import signUp from '@/components/user/signUp'
import meet from '@/components/meetup/meet'
import Vuetify from 'vuetify'
 
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
      component: createMeetup
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
      component: meetup
    },
    {
      path: '/profile',
      name: 'Profile',
      component: profile
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
