<template>
  <v-card :color="cardColor" dark flat tile>
    <v-card-title primary class="title" v-text="tracker.attributes.friendly_name"></v-card-title>
    <v-card-text>
      <v-icon x-large>person</v-icon>
      <span v-text="currentState"></span>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    props: {
      tracker: { required: true }
    },

    computed: {
      isHome () {
        return this.tracker.state === 'home'
      },
      cardColor () {
        if (this.isHome) {
          return this.tracker.attributes.friendly_name === 'Gerwin' ? 'light-blue lighten-1' : 'pink lighten-1'
        }
        return 'blue-grey lighten-1'
      },
      currentState () {
        return this.isHome ? 'Thuis' : 'Weg'
      }
    }
  }
</script>
