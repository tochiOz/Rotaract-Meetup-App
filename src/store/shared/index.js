export default {
    //store will have a state and a mutations to change that state, and some actions to dispatch the mutations and some getters to get th estore in our component.
    state: {// it is called loaded meetups because it will be loaded from the firebase, so the store helps link info to the backend
        error: null,
        loading: false
    },
    mutations: {//mutations store changes made to the state of the informations stored in it
        //added information from the create-meetup page
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
        clearError ({commit}) {
            commit('clearError')
        }
    },
    getters: {//this acts as a route to direct the state to as many components as possible
        error (state) {
            return state.error
        },
        loading (state) {
            return state.loading
        }
    }
}