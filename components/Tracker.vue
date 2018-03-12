<template>
  <v-card :id="cardId" dark flat tile>
    <v-layout class="text-xs-center">
      <v-flex>
        <img :src="pictureUrl" class="mt-3">
        <h1 class="header-3 mb-1" v-text="currentState"></h1>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
      tracker: { required: true }
    },

    computed: {
      ...mapGetters({
        apiUrl: 'getApiUrl'
      }),

      isHome () {
        return this.tracker.state === 'home'
      },

      cardId () {
        if (this.isHome) {
          let gender = this.tracker.attributes.friendly_name.slice(-1)
          if (gender === 'm') {
            return 'male-home-card'
          }
          if (gender === 'f') {
            return 'female-home-card'
          }
          return 'no-gender-home-card'
        }
        return 'away-card'
      },

      currentState () {
        return this.isHome ? 'Thuis' : 'Weg'
      },

      pictureUrl () {
        return `${this.apiUrl}${this.tracker.attributes.entity_picture}`
      }
    }
  }
</script>

<style>
  #male-home-card {
    background-color: #68AEC1;
  }
  #female-home-card {
    background-color: #E66E77;
  }
  #no-gender-home-card {
    background-color: #C4835E;
  }
  #away-card {
    background-color: #81807C;
  }
</style>