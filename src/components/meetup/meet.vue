<template>
    <v-container fluid>
        <v-layout row wrap  v-if="loading">
            <v-flex xs12 class="text-xs-center">
                <v-progress-circular
                    :size="70"
                    :width="7"
                    color="amber"
                    indeterminate
                ></v-progress-circular>
            </v-flex>
        </v-layout>
        <v-layout row v-else>
            <v-flex>
                <v-card  mt-20>
                    <v-card-title class="error--text">
                        <div><h2>{{ meetup.title }}</h2></div>  
                        <template v-if="userIsCreator" offset-sm2>
                            <v-spacer></v-spacer>
                            <app-edit :meetup="meetup"></app-edit>
                        </template>
                        </v-if>
                    </v-card-title>
                    <v-card-media 
                    :src="meetup.imageUrl"
                    height="400px"
                    ></v-card-media>
                    <v-card-text>
                        <div class="text--primary">{{ meetup.date | date }}  --  {{ meetup.Place }}</div>
                        <!-- <div>
                            <app-date 
                            :meetup="meetup"
                            v-if="userIsCreator">
                            </app-date>
                            <app-time 
                            :meetup="meetup"
                            v-if="userIsCreator">
                            </app-time> 
                        </div> -->
                        <p>{{ meetup.description }}</p>
                    </v-card-text>
                    <v-card-actions justify-end>
                        <app-reg :meetupId = "meetup.id"></app-reg>
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
        },
        isAuthenticated () {
            return this.$store.getters.user !== null && this.$store.getters.user !== undefined
        },
        userIsCreator () {
            if (!this.isAuthenticated) {
                return false
            }
            return this.$store.getters.user.id = this.meetup.creatorId
        },
        loading () {
            return this.$store.getters.loading
        }
    }
}
</script>

<style scoped>
app-reg {
    margin-left: 100px;
}
</style>
