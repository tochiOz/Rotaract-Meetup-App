<template>
    <v-container>
        <v-layout 
        row
        wrap
        v-for="meetup in meetups"
        :key="meetup.id"
        class="mb-3"
        >
            <v-flex xs12 sm10 md8 offset-sm1 offset-md2>
                <v-card class="error">
                    <v-container fluid>
                        <v-layout row>
                            <v-flex>
                                <v-card-media 
                                :src="meetup.imageUrl"
                                height="150px"
                                ></v-card-media>
                            </v-flex>
                            <v-flex xs7 sm8 md9>
                                <v-card-title primary-title>
                                    <div>
                                        <h2 class="white--text mb-0 bold">{{ meetup.title }}</h2>
                                        <div>{{ meetup.date | date }}</div>
                                        <div class="white--text bold">{{ meetup.Place }}</div>
                                    </div>
                                </v-card-title>
                                <v-card-actions>
                                    <v-btn 
                                    flat
                                    router :to="'/meetup/' + meetup.id"
                                    >
                                        <v-icon left light>arrow_forward</v-icon>
                                        View Meetup
                                    </v-btn>
                                </v-card-actions>
                            </v-flex>
                        </v-layout>
                    </v-container>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>  

<script>
export default {
    props: {
        id: ""
    },  
    computed: {
        meetups () {
            return this.$store.getters.loadedMeetups
        }
    }
}
</script>
