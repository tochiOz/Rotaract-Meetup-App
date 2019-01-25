<template>
    <v-container>
        <v-layout row>
            <v-flex xs12 sm6 offset-sm3>
                <h1 dark disabled>Create A New Meetup</h1>
            </v-flex>
        </v-layout>
        <v-layout row>
            <v-flex xs12>
                <form @submit.prevent="loadCreateMeetup">
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                           <v-text-field
                           name="title"
                           label="Title"
                           id="title"
                           v-model="title"
                           required
                           ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                           <v-text-field
                           name="Place"
                           label="Place"
                           id="Place"
                           v-model="Place"
                           required
                           ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                           <h3>Choose a Date & Time</h3>
                        </v-flex>
                    </v-layout>
                    <v-layout row wrap>
                        <v-flex xs11 sm6 offset-sm3>
                        <v-dialog
                            ref="dialogx"
                            v-model="modal"
                            :return-value.sync="date"
                            persistent
                            lazy
                            full-width
                            width="290px"
                        >
                            <v-text-field
                            slot="activator"
                            v-model="date"
                            label="Picker in dialog"
                            prepend-icon="event"
                            readonly
                            ></v-text-field>
                            <v-date-picker v-model="date" scrollable>
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialogx.save(date)">OK</v-btn>
                            </v-date-picker>
                        </v-dialog>
                        </v-flex>
                        <v-flex xs11 sm6 offset-sm3>
                        <v-dialog
                            ref="dialog"
                            v-model="modal2"
                            :return-value.sync="time"
                            persistent
                            lazy
                            full-width
                            width="290px"
                        >
                            <v-text-field
                            slot="activator"
                            v-model="time"
                            label="Picker in dialog"
                            prepend-icon="access_time"
                            readonly
                            ></v-text-field>
                            <v-time-picker
                            v-if="modal2"
                            v-model="time"
                            full-width
                            format="24hr"
                            >
                            <v-spacer></v-spacer>
                            <v-btn flat color="primary" @click="modal2 = false">Cancel</v-btn>
                            <v-btn flat color="primary" @click="$refs.dialog.save(time)">OK</v-btn>
                            </v-time-picker>
                        </v-dialog>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                          <v-btn raised class="primary" @click="onPickFile">Upload Image</v-btn>
                          <input 
                          type="file" 
                          style="display: none" 
                          ref="inputtedFile" 
                          accept="image/*"
                          @change="onFilePicked">
                          <!-- the (ref) is used to reference the element to any item in the DOM -->
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                           <img :src="imageUrl" height="150px">
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                           <v-text-field
                           name="decription"
                           label="Description"
                           id="description"
                           v-model="description"
                           multi-line
                           required
                           ></v-text-field>
                        </v-flex>
                    </v-layout>
                    <v-layout row>
                        <v-flex xs12 sm6 offset-sm3>
                            <v-btn type="submit" class="primary" :disabled="!formIsValid">Create Meetup</v-btn>
                        </v-flex>
                    </v-layout> 
                </form>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    data () {
        return {
            title: '',
            Place: '',
            imageUrl: '',
            description: '',
            date: new Date().toISOString().substr(0, 10),
            menu: false,
            modal: false,
            menu2: false,
            modal2: '',
            time: '',
            image: null
        }
    },
    computed: {//this means that the below will be executed autmatically as the page loads
        formIsValid () {
            return this.title !== '' &&
            this.Place !== '' &&
            this.image !== '' &&
            this.description !==  ''
        },
        loadedDateTime () {
            const date = new Date(this.date)
            if (typeof this.time === 'string') {
                let hours = this.time.match(/^(\d+)/)[1]
                const minutes = this.time.match(/:(\d+)/)[1]
                date.setHours(hours)
                date.setMinutes(minutes)
            }else {
                date.setHours(this.time.getHours())
                date.setMinutes(this.time.getMinutes())
            }
            console.log(date)
            return date
        }
    },
    methods: {
        loadCreateMeetup () {
            if (!this.formIsValid) {
                return
            }
            if (!this.image) {
                return 
            }
            const meetupData = {
                title: this.title,
                Place: this.Place,
                image: this.image,
                description: this.description,
                date: this.loadedDateTime
            }
            this.$store.dispatch('createMeetup', meetupData)//you dispatch changes made on the state within the mutations and actions bracket
            return this.$router.push('/meetup')
        },
        onPickFile () {
            this.$refs.inputtedFile.click()
        },
        onFilePicked (event) {
            //when the file is picked what happens next
            const files = event.target.files//used to target all uploaded files
            let filename = files[0].name//used to select a single file in the files array
            if (filename.lastIndexOf('.') <= 0) {
                return alert('Please add a valid file!')
            }
            //turning file into a base 64 string file, ie a string value
            const fileReader = new FileReader()//which is actually a function that converts file to string
            fileReader.addEventListener('load', () => {
                this.imageUrl = fileReader.result
            })
            fileReader.readAsDataURL(files[0])
            this.image = files[0]
        }
    }
}
</script>
