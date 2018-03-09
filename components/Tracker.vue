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
          return this.tracker.attributes.friendly_name === 'Gerwin' ? 'gerwin-home-card' : 'sophie-home-card'
        }
        return 'away-card'
      },
      currentState () {
        return this.isHome ? 'Thuis' : 'Weg'
      },
      pictureUrl () {
        let name = this.tracker.attributes.friendly_name === 'Gerwin' ? 'gerwin' : 'sophie'
        return `${this.apiUrl}/local/${name}.png`
      }
    }
  }
</script>

<style>
  #gerwin-home-card {
    background-color: #68AEC1;
  }
  #sophie-home-card {
    background-color: #E66E77;
  }
  #away-card {
    background-color: #81807C;
  }
</style>