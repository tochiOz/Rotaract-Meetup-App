<template>
    <v-alert error type="error" @input="onClose" dismissible :value="true">
        {{ text }}
    </v-alert>
</template>

<script>
export default {
    props: ['text'],
    methods: {
        onClose () {
            this.$emit('dismissed')
        }
    }
}
</script>
