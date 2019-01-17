<template>
    <v-container fluid>
        <v-layout row>
            <v-flex>
                <v-card  mt-20>
                    <v-card-title class="error--text">
                        <div><h2>{{ meetup.title }}</h2></div>
                    </v-card-title>
                    <v-card-media 
                    :src="meetup.imageUrl"
                    height="400px"
                    ></v-card-media>
                    <v-card-text>
                        <div class="text--primary">{{ meetup.date | date }}  --  {{ meetup.Place }}</div>
                        <p>{{ meetup.description }}</p>
                    </v-card-text>
                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn class="error align-right">Register</v-btn>
                    </v-card-actions>    
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    props: ['id'],
    computed: {
    meetup () {
            return this.$store.getters.loadedMeetup(this.id)
        }
    }
}
</script>
