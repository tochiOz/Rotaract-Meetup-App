import * as firebase from 'firebase'

export default {
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
        ]
    },
    mutations: {//mutations store changes made to the state of the informations stored in it
        //added information from the create-meetup page
        setLoadedeMeetup (state, payload) {//this are useds to set the store to the payload which will be cmmitted with the data into firebase in the actions tab
            state.loadedMeetups = payload
        },
        createMeetup (state, payload) {
            state.loadedMeetups.push(payload)
        },
        setUpdateEdit (state, payload) {//mutating the new data to the stored state for display
            const meetup = state.loadedMeetups.find(meetup => {
                return meetup.id === payload.id//locating the same id that the data was updated from, to effect the changes
            })
            if (payload.title) {
                meetup.title = payload.title
            }
            if (payload.description) {
                meetup.description = payload.description
            }
            if (payload.date) {
                meetup.date = payload.date.toISOString()
            }
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
                        imageUrl: obj[key].imageUrl,
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
                    ...meetup,//this is done to get a default id, saved to an object that is committed
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
        updateMeetupData ({commit}, payload) {
            commit('setLoading', true)//the loader will surely load when the information is passed as a payload
            const updateObj = {}
            if (payload.title) {
                updateObj.title = payload.title
            }
            if (payload.description) {
                updateObj.description = payload.description
            }
            if (payload.date) {
                updateObj.date = payload.date
            }
            firebase.database().ref('meetupsData').child(payload.id).update(updateObj)
            .then(() => {
                commit('setLoading', false)
                commit('setUpdateEdit', payload)
            })
            .catch(error => {
                console.log(error)
                commit('setLoading', false)
            })
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
        }
    }
}