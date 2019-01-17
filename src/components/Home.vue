<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12>
                <v-carousel align-center style="cursor: pointer;">
                    <v-carousel-item
                    v-for="meetup in meetups"
                    :src="meetup.imageUrl"
                    :key="meetup.id"
                    @click="onLoadMeetup(meetup.id)"
                    reverse-transition="fade"
                    transition="fade">
                    <div class="slide-title">
                        {{ meetup.title }}
                    </div>
                    </v-carousel-item>
                </v-carousel>
            </v-flex>
        </v-layout>
        <v-layout>
            <v-flex>
                <v-card>
                    <v-card-title primary-title>
                        <div  class="attach">
                            <h2>THIS ARE THE ATTACHED MEETUPS</h2>
                        </div>
                    </v-card-title>
                </v-card>
            </v-flex>
        </v-layout>
        <v-layout row wrap mt-3>
            <v-flex xs12 sm6 class="text-xs-center text-sm-right">
                <v-btn large router to="/meetup" dark color="orange darken-2">EXPLORE MEETUPS</v-btn>
            </v-flex>
            <v-flex xs12 sm6 class="text-xs-center text-sm-left">
                <v-btn large router to="/meetup/new" dark color="red darken-1">ORGANISE MEETUPS</v-btn>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
export default {
    computed: {
        meetups () {
            return this.$store.getters.featuredMeetups
        }
    },
    methods: {
        onLoadMeetup (id) {
            this.$router.push('/meetup/' + id)
        }
    }
}
</script>

<style scoped>
    .slide-title{
        text-align: center;
        background-color: rgba(0, 0, 0, 0.5);
        font-size: 2em;
        color: beige;
        position: absolute;
        bottom: 50px;
        padding: 20px;
    }

    .attach {
        margin: auto;
        text-align: center;
        font-size: 1.5em;
        font-family: 'Times New Roman', Times, serif;
        font-weight: bold;
    }
</style>
