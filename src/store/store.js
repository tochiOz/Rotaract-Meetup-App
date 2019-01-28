import Vue from 'vue'
import Vuex from 'vuex'

import { error } from 'util';
import meetup from './meetup'
import user from './user'
import shared from './shared'

Vue.use(Vuex)

export const store = new Vuex.Store({
   //importing the modules page connecting other various store to the main store
    modules: {
        meetup: meetup,  
        user: user,
        shared: shared
    }
})