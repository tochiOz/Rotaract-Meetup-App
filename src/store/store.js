import Vue from 'vue'
import Vuex from 'vuex'
import * as firebase from 'firebase'
import { error } from 'util';

Vue.use(Vuex)

export const store = new Vuex.Store({
    //store will have a state and a mutations to change that state, and some actions to dispatch the mutations and some getters to get th estore in our component.
    state: {// it is called loaded meetups because it will be loaded from the firebase, so the store helps link info to the backend
        loadedMeetups: [
            {
                imageUrl: 'https://d2z11snniwyi52.cloudfront.net/images/template/5215/17/Rotary-Club-2-Poster__front.png', 
                id: 'rotaractImg1', 
                title: '2nd Annual Rotary Fundraiser', 
                date: new Date(),
                Place: 'Lagos',
                description: 'Join The 2nd Rotary Fundraiser'
            },
            
            {
                imageUrl: 'http://rotaryeclubd9210harare.org/wp-content/uploads/2018/04/Rotaract-50.jpg', 
                id: 'rotaractImg4', 
                title: 'Rotaract At 50', 
                date: new Date(),
                Place: 'Afaha-Uqua',
                description: 'Happy Birthday Rotary'
            }
        ],
        user: null,
        error: null,
        loading: false
    },
    mutations: {//mutations store changes made to the state of the informations stored in it
        //added information from the create-meetup page
        setLoadedeMeetup (state, payload) {//this are useds to set the store to the payload which will be cmmitted with the data into firebase in the actions tab
            state.loadedMeetups = payload
        },
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        //information gotten as the user profile, it sends the user info as payload into the user folder of the state
        setUser (state, payload) {
            state.user = payload
        },
        setError (state, payload) {
            state.error = payload
        },
        setLoading (state, payload) {
            state.loading = payload
        },
        clearError (state) {
            state.error = null
        }
    },
    actions: {
        loadMeetups ({commit}) {
            commit('setLoading', true)
            firebase.database().ref('meetupsData').once('value')
            .then((data) => {
               const meetups = [] //creating an array where the  stored data will be iterated into
               const obj = data.val()//this stores the objects value in a variable
               for (const key in obj) {
                   meetups.push({//used to push each object value to the empty array
                        id: key,
                        title: obj[key].title,
                        description: obj[key].description,
                        date: obj[key].date,
                        Place: obj[key].Place,
                        creatorId: obj[key].creatorId
                   })
               }
               commit('setLoadedeMeetup', meetups)
               commit('setLoading', false)
            })
            .catch(
                (error) => {
                    console.log(error)
                    commit('setLoading', true)
                }
            )
        },
        //This is the action made to create a meetup, commiting the information passed by a user 
        createMeetup ({commit, getters}, payload) {
            const meetup = {
                title: payload.title,
                Place: payload.Place,
                description: payload.description,
                date: payload.date.toISOString(),//it helps to convert the date to astring which can be stored
                creatorId: getters.user.id
            }
            //Before commiting the retrieved data from your payload, send it to firebase setup is neccesary
            //remember actions is the place whee you do ayschronous tasks
            let imageUrl
            let key
            firebase.database().ref('meetupsData').push(meetup)//select nodes where the data will be stored
            .then((data) => {//without a key its difficult to view the data stored in the firebase
                key = data.key
                return key
            })
            .then(key => {// to store the image id using the key into firebase
                const filename = payload.image.name
                const ext = filename.slice(filename.lastIndexOf('.'))
                let uploadTask = firebase.storage().ref('meetups/' + key + '.' + ext).put(payload.image)
                return uploadTask
            })
            .then ( uploadTask => {
                uploadTask.ref.getDownloadURL().then(function(downloadURL) {
                    console.log(downloadURL)
                    imageUrl = downloadURL
                    return firebase.database().ref('meetupsData').child(key).update(
                        { imageUrl: imageUrl
                    })
                })
            })
            .then(() => {
                commit('createMeetup',{
                    ...meetup,//this is done to get a default id, saved to an object that will be committed
                    imageUrl: imageUrl,//as gotten from firebase
                    id: key
                })
            })
            .catch((error) => {
                console.log(error)
            })
            //Reach out to Firebase and store it
            //when a new actions  is made it must be committed before it can finally work
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
                        registeredMeetups: []
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
                        registeredMeetups: []
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
            commit('setUser', {id: payload.uid, registeredMeetups: []})
        },
        logout ({commit}) {
            firebase.auth().signOut()
            commit('setUser', null)    
        },
        clearError ({commit}) {
            commit('clearError')
        }
    },
    getters: {//this acts as a route to direct the state to as many components as possible
        loadedMeetups (state) {//sort() is a method that creates a new arrray and compares a set of arguements
            return state.loadedMeetups.sort((meetupA, meetupB) => {
                return meetupA.date > meetupB.date
            })
        },
        featuredMeetups (state, getters) {
            return getters.loadedMeetups.slice(0, 5)
        },
        loadedMeetup (state) {
            return (meetupId) => {
                return state.loadedMeetups.find((meetup) => {
                    return meetup.id === meetupId
                })
            }
        },
        user (state) {
            return state.user
        },
        error (state) {
            return state.error
        },
        loading (state) {
            return state.loading
        },
        //this is a getter used to authentice a state and to check if the state of a user has been sent from the browser
        isAuthenticated (state) {
            return state.user !== null && state.user !== undefined
        }
    }
})