import { store } from '../store/store'

export default (to, from, next) =>{
    if (store.getters.user) {
        next()
    } else {//this shows that if the user is authenticated in the store, it redirects to the route sigin
        next('/signIn')
    }
}
//this was created to guard any user who hasn't been signed in not to have authenticated access to make changes to the profile page.
//to is where we are going to 
//from is the route where we are coming from
//next is the route is going to