<template>
    <v-layout row justify-center wrap>
        <v-dialog v-model="dialog" persistent max-width="350px">
            <v-btn slot="activator" color="primary">Edit Date</v-btn>
            <v-card>
                <v-container>
                    <v-card-title>
                        <span class="headline">Edit Meetup Date</span>
                    </v-card-title>
                    <v-divider></v-divider>
                    <v-layout row>
                        <v-flex xs12>
                            <v-date-picker 
                            v-model="editDate" 
                            style="width: 100%"
                            actions>
                                <template slot-scope="{save, cancel}">
                                    <v-btn flat color="red darken-1" flat @click.native="dialog = false">Close</v-btn>
                                    <v-btn flat color="red darken-1" flat @click.native="onSaveDate">Save</v-btn>
                                </template>
                            </v-date-picker>
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
            editDate: null //because no date selected yet
        } 
    },
    created () {
        this.editDate = new Date(this.meetup.date)// TO showcase/an immediate display of the current date base on the meetup id
    },
    methods: {
        onSaveDate () {//this recieves the newdate, set them in utc format and disptaches to the firebase
        const newDate = new Date(this.meetup.date)// this is a variable that stores the new inputted dates
        const newDay = new Date(this.editDate).getUTCDay()//get the inputted date from editdate and stores
        const newMonth = new Date(this.editDate).getUTCMonth()//get the inputted month from editdate and stores
        const newYear = new Date(this.editDate).getUTCFullYear()//get the inputted year from editdate and stores
        //there after obtaining, we set the current date to the newDate
        newDate.setUTCDate(newDay)
        newDate.setUTCMonth(newMonth)
        newDate.setUTCFullYear(newYear)
        const edittedDate = {
                date: newDate,
                id: this.meetup.id
            }
        //now dispatch the set date from the mutation
        this.$store.dispatch('updateMeetupData', edittedDate)
         return this.dialog = false
        }
    } 
  }
</script>

<style scoped>

</style> 
