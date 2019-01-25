<template>
    <v-layout row justify-center wrap>
        <v-dialog v-model="dialog" persistent max-width="400px">
            <v-btn slot="activator" color="primary">Edit Time</v-btn>
            <v-card>
                <v-container>
                    <v-card-title>
                        <span class="headline">Edit Meetup Time</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs12>
                            <v-time-picker 
                            v-model="editTime" 
                            style="width: 100%"
                            format="24hr"
                            actions>
                                <template slot-scope="{save, cancel}">
                                    <v-btn flat color="red darken-1" flat @click="dialog = false">Close</v-btn>
                                    <v-btn flat color="red darken-1" flat @click="onSaveTime">Save</v-btn>
                                </template>
                            </v-time-picker>
                        </v-flex>
                    </v-layout>
                </v-container>   
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>
  export default {
    props:['meetup'],
    data () {
        return {
            dialog: false,
            editTime: null //because no date selected yet
        } 
    },
    created () {
        this.editTime = new Date(this.meetup.date).toISOString().substr(0, 10)// TO showcase the current date base on the meetup id
    },
    methods: {
        onSaveTime () {//this recieves the newdate, set them in utc format and disptaches to the firebase
        const newDate = new Date(this.meetup.date)
        const hours = this.editTime.match(/^(\d+)/)[1]
        const minutes = this.editTime.match(/:(\d+)/)[1]
        newDate.setHours(hours)
        newDate.setMinutes(minutes)
        const edittedTime = {
                date: newDate,
                id: this.meetup.id
            }
        //now dispatch the set date from the mutation
        this.$store.dispatch('updateMeetupData', edittedTime)
        }
    } 
  }
</script>