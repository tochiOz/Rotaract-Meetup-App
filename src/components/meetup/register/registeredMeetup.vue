<template>
    <v-layout row justify-center wrap>
        <v-dialog v-model="dialog" persistent style="width: 300px" class="align-center">
            <v-btn class="error" slot="activator" color="primary">
                {{ userIsRegistered ? 'Unregister' : 'Register'}}
            </v-btn>
            <v-card class="text-md-center" style="width: 500px">
                <v-container>
                    <v-card-title v-if="userIsRegistered">
                        <span class="headline">Unregister From Meetup</span>
                    </v-card-title>
                    <v-card-title v-else>
                        <span class="headline">Register For Meetup</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs12>
                            <v-card-text class="text--center"> You can always change your decision later on</v-card-text>
                        </v-flex>
                    </v-layout>
                    <v-card-actions>
                        <v-btn 
                        class="red--text darken-1" 
                        flat
                        @click="dialog = false">Cancel</v-btn>
                        <v-btn 
                        class="green--text darken-1"
                        flat
                        @click="onSaveRegistration"
                        >Confirm</v-btn>
                    </v-card-actions>
                </v-container>   
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
  export default {
    props:['meetupId'],
    data () {
        return {
            dialog: false 
        } 
    },
    computed: {
        userIsRegistered (meetupId) {
            return this.$store.getters.user.registeredMeetups.findIndex(meetupId => {
                return meetupId === this.meetupId 
            }) >= 0
        }
    },
    methods: {
        onSaveRegistration () {
            if (this.userIsRegistered) {
                this.$store.dispatch('unregisterUserForMeetup', this.meetupId)
            } else {
                this.$store.dispatch('registerUserForMeetup', this.meetupId)
            }
            return this.dialog = false
        }
    }
  }
</script>