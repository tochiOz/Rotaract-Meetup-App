<template>
    <v-layout row justify-end wrap>
        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-btn slot="activator" fab accent large dark color="primary"></v-btn>
            <v-icon>edit</v-icon>
            <v-card>
                <v-card-title>
                    <span class="headline">Edit Meetup</span>
                </v-card-title>
                <v-divider></v-divider>
                <v-card-text>
                    <v-container>
                        <v-layout row>
                            <v-flex xs12 offset-sm1>
                                <v-text-field
                                name="title"
                                label="Title"
                                id="title"
                                v-model="edittedTitle"
                                required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                        <v-layout row>
                            <v-flex xs12 offset-sm1>
                                <v-text-field
                                name="decription"
                                label="Description"
                                id="description"
                                v-model="edittedDescription"
                                multi-line
                                required
                                ></v-text-field>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn flat color="red darken-1" flat @click="dialog = false">Close</v-btn>
                    <v-btn flat color="red darken-1" flat @click="onSaveChanges">Save</v-btn>
                </v-card-actions>
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
            edittedTitle: this.meetup.title,
            edittedDescription: this.meetup.description
        }
    },
    methods: {
        onSaveChanges () {
            if (this.edittedTitle.trim() === '' || this.edittedDescription.trim() === '') {
                return
            }
            this.dialog = false
            const edittedData = {
                title: this.edittedTitle,
                description: this.edittedDescription,
                id: this.meetup.id
            }
            this.$store.dispatch('updateMeetupData', edittedData)
        }
    } 
  }
</script>