import * as firebase from 'firebase'

export default {
    state: {
        user: null
    },
    mutations: {//mutations store changes made to the state of the informations stored in it
        //added information from the create-meetup page
        //information gotten as the user profile, it sends the user info as payload into the user folder of the state
        setUser (state, payload) {
            state.user = payload
        },
        setRegisteredMeetup (state, payload) {
          
            const id = payload.id
            if (state.user.registeredMeetups.findIndex(meetup => meetup.id === id) >= 0) {
                return
            }
            state.user.registeredMeetups.push(id)
            state.user.fbkeys[id] = payload.fbkey
        },
        setUnregisteredMeetup (state, payload) {
            const registeredMeetups = state.user.registeredMeetups
            //now remove the id of the registered meetups
            registeredMeetups.splice(registeredMeetups.findIndex(meetup => meetup.id === payload), 1)
            Reflect.deleteProperty(state.user.fbkeys, payload)//to delete the registration id for the meetup store under fbkeys
        }
    },
    actions: {
        registerUserForMeetup ({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            firebase.database().ref('/users/' + user.id).child('/registrations/').push(payload)
            .then(data => {
                commit('setLoading', false)
                commit('setRegisteredMeetup', {id: payload, fbkey: data.key})
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
        },
         
        unregisterUserForMeetup ({commit, getters}, payload) {
            commit('setLoading', true)
            const user = getters.user
            if (!user.fbkeys) {
                return
            }
            const fbkey = user.fbkeys[payload]
            firebase.database().ref('/users/' + user.id + '/registrations/').child(fbkey).remove()
            .then(() => {
                commit('setLoading', false)
                commit('setUnregisteredMeetup', payload)
            })
            .catch((error) => {
                console.log(error)
                commit('setLoading', false)
            })
        },
        // this is the set of authetication process that makes uses of the .then() to pass promises, of either the fulfilling part of the error messages
        signUserUp ({commit}, payload) {
            commit('setLoading', true)//this is done cause the user info is loading into the firebase for authentication
            commit('clearError')
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            //sending the promise catcher for the the 2 possible arguements
            .then(//when the promise is accepted
                user => {//this registers the new set of users and their id
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: [],
                        fbkeys: {}
                    }
                    commit('setUser', newUser)
                }
            )
            .catch(//this is used when the promise is rejected
                error => {
                    commit('setLoading', false)//it can't be loading when there is an ERROR!!!!
                    commit('setError', error.message)
                    console.log(error)
                } 
            )
        },
        // every sign up commit must have a sign in commit in the actions state and must be dispatched in thier respective pages
        signUserIn ({commit}, payload) {
            commit('setLoading', true)//this is done cause the user info is loading into the firebase for authentication
            commit('clearError')
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            //sending the promise catcher for the the 2 possible arguements
            .then(//when the promise is accepted
                user => {//this registers the new set of users and their id
                    commit('setLoading', false)
                    const newUser = {
                        id: user.uid,
                        registeredMeetups: [],
                        fbkeys: {}
                    }
                    commit('setUser', newUser)
                }
            )
            .catch(//this is used when the promise is rejected
                error => {
                    commit('setLoading', false)//it can't be loading when there is an ERROR!!!!
                    commit('setError', error.message)
                } 
            )
        },
        autoSignIn ({commit}, payload) {
            commit('setUser', {
                id: payload.uid, 
                registeredMeetups: [],
                fbkeys: {}
            })
        },
        fetchUserState ({commit, getters}) {
            commit('setLoading', true)
            //this is used to fetch the users and user.id once in values
            firebase.database().ref('/users/' + getters.user.id + '/registrations/').once('value')
            .then(data => {
                const dataPairs = data.val()
                let registeredMeetups = []
                let swappedPairs = {}//this is used to denote the fbkeys also the registration keys of a certain meetup
                for (const key in dataPairs) {
                    registeredMeetups.push(dataPairs[key])
                    swappedPairs[dataPairs[key]] = key
                }
                const updateUser = {
                    id: getters.user.id,
                    registeredMeetups: registeredMeetups,
                    fbkeys: swappedPairs
                }
                commit('setUser', updateUser)
                commit('setLoading', false)
            })
            .catch(error => {
                console.log(error)
            })
        },
        logout ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)    
        }
    },
    getters: {//this acts as a route to direct the state to as many components as possible
        user (state) {
            return state.user
        },
        //this is a getter used to authentice a state and to check if the state of a user has been authenticated through the browser
        isAuthenticated (state) {
            return state.user !== null && state.user !== undefined
        }
    }
}