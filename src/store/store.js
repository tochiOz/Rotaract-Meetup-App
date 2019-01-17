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
                imageUrl: 'https://image.slidesharecdn.com/z4bphhsfof9ojustyhwr-signature-b77e2888de5d2c3fa549eb47ce56136ac767a2c046451f374ecf1e7b791061cf-poli-150330061218-conversion-gate01/95/rotary-public-image-547-aen-by-pdg-yasser-assem-33-638.jpg?cb=1427714117', 
                id: 'rotaractImg2', 
                title: 'Lisbon 2015', 
                date: new Date(),
                Place: 'Maimi',
                description: 'Join The Lisbon Conference'
            },
            {
                imageUrl: 'https://clubrunner.blob.core.windows.net/00000050055/Images/IMG_3626.JPG', 
                id: 'rotaractImg3',
                title: 'Be the Inspiration', 
                date: new Date(),
                Place: 'Uyo',
                description: 'Join The Rotary & be the Inspiration'
            },
            {
                imageUrl: 'http://rotaryeclubd9210harare.org/wp-content/uploads/2018/04/Rotaract-50.jpg', 
                id: 'rotaractImg4', 
                title: 'Rotaract At 50', 
                date: new Date(),
                Place: 'Afaha-Uqua',
                description: 'Happy Birthday Rotary'
            },
            {
                imageUrl: 'https://a.wayin.com/images/5157/ce541b56-14ef-468b-b177-8e954edb57f8/d2_8.jpg', 
                id: 'rotaractImg5', 
                title: 'Rotaract Conference', 
                date: new Date(),
                Place: 'Jacob',
                description: 'Join The 2nd Rotary Conference'
            }
        ],
        user: null   
    },
    mutations: {//mutations store changes made to the state of the informations stored in it
        //added information from the create-meetup page
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        //information gotten as the user profile, it sends the user info as payload into the user folder of the state
        setUser (state, payload) {
            return state.user = payload
        }
    },
    actions: {
        //This is the action made to create a meetup, commiting the information passed by a user 
        createMeetup ({commit}, payload) {
            const meetup = {
                title: payload.title,
                Place: payload.Place,
                imageUrl: payload.imageUrl,
                description: payload.decription,
                date: payload.date
            }
            //Reach out to Firebase and store it
            commit('createMeetup', meetup)
            //when a new actions  is made it must be committed before it can finally work
        },
        // this is the set of authetication process that makes uses of the .then() to pass promises, of either the fulfilling part of the error messages
        signUserUp ({commit}, payload) {
            firebase.auth().createUserWithEmailAndPassword(payload.email, payload.password)
            //sending the promise catcher for the the 2 possible arguements
            .then(//when the promise is accepted
                user => {//this registers the new set of users and their id
                    const newUser = {
                        id: user.uid,
                        registeredMeetup: []
                    }
                    commit('setUser', newUser)
                }
            )
            .catch(//this is used when the promise is rejected
                error => {
                    console.log(error)
                    
                } 
            )
        },
        // every sign up commit must have a sign in commit in the actions state and must be dispatched in thier respective pages
        signUserIn ({commit}, payload) {
            firebase.auth().signInWithEmailAndPassword(payload.email, payload.password)
            //sending the promise catcher for the the 2 possible arguements
            .then(//when the promise is accepted
                user => {//this registers the new set of users and their id
                    const newUser = {
                        id: user.uid,
                        registeredMeetup: []
                    }
                    commit('setUser', newUser)
                }
            )
            .catch(//this is used when the promise is rejected
                error => {
                    console.log(error)
                } 
            )
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
        //this is a getter used to authentice a state and to check if the state of a user has been sent from the browser
        isAuthenticated (state) {
            return state.user !== null && state.user !== undefined
        }
    }
})