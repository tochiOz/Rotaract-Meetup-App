<template>
  <v-app>
    <v-toolbar dark color="primary darken-1">
      <v-toolbar-side-icon 
        @click.stop="sideNav = !sideNav"
        class="hidden-md-and-up"
        >
        </v-toolbar-side-icon>
      <v-toolbar-title class="white--text">
        <router-link to="/" tag="span" style="cursor: pointer">ROTARACT COMMUNITY</router-link>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn 
        flat 
        v-for="item in navItems" 
        :key="item.title"
        :to="item.link"
        >
          <v-icon left>{{ item.icon }}</v-icon>
          {{ item.title }}
        </v-btn>
      </v-toolbar-items>
      <v-toolbar-items class="hidden-sm-and-down">
        <v-btn 
        flat 
        v-if="isAuthenticated"
        @click="onLogOut"
        >
          <v-icon left>exit_to_app</v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
  </v-toolbar>
  <v-navigation-drawer 
    absolute
    temporary 
    v-model="sideNav">
    <v-list>
      <v-list-tile 
      v-for="item in navItems" 
      :key="item.title"
      :to="item.link"
      >
        <v-list-tile-action>
          <v-icon>{{ item.icon }}</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>{{ item.title }}</v-list-tile-content>
      </v-list-tile>
      <v-list-tile>
        <v-list-tile-action 
        v-if="isAuthenticated"
        @click="onLogOut">
          <v-icon>exit_to_app</v-icon>
        </v-list-tile-action>
        <v-list-tile-content>Logout</v-list-tile-content>
      </v-list-tile>
    </v-list>
  </v-navigation-drawer>
  <main>
    <router-view></router-view>
  </main>
  </v-app>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App',
      sideNav: false,
    }
  },
  computed: {
    navItems () {
      if (this.isAuthenticated) {
        return [
          { icon: 'supervisor_account', title: 'View MeetUps', link: '/meetup'},
          { icon: 'room', title: 'Create MeetUps', link: '/meetup/new'}
        ]
      }else {
        return [
          { icon: 'face', title: 'Sign In', link: '/signIn'},
          { icon: 'lock_open', title: 'Sign Up', link: '/signUp'}
        ]
      }
    },
    isAuthenticated () {
    return this.$store.getters.isAuthenticated
    }
  },
  methods: {
    onLogOut () {
      this.$store.dispatch('logout')
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  router-view{
    margin: 0;
  }
</style>