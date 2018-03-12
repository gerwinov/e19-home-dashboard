<template>
  <v-card id="media-card" dark flat tile ripple>
    <v-layout row>
      <v-flex xs7 class="ml-3 mt-3">
        <h1 class="header-2 mb-2" v-text="mediaplayer.attributes.media_title"></h1>
        <span class="sub-2" v-text="mediaplayer.attributes.media_artist"></span>
      </v-flex>
      <v-flex xs5 class="mr-3 mt-3">
        <v-card-media id="media-picture" :src="mediaPicture" height="110px"></v-card-media>
      </v-flex>
    </v-layout>

    <v-layout row justify-end align-center class="mr-2">
      <v-btn class="card-button" outline medium fab @click="mediaAction('volume_down')">
        <img src="/icons/volume_down.svg">
      </v-btn>
      <v-btn class="card-button" outline medium fab @click="mediaAction('volume_up')">
        <img src="/icons/volume_up.svg">
      </v-btn>
    </v-layout>

    <v-layout row justify-end align-center class="mr-2">
      <v-btn class="card-button" outline medium fab @click="mediaAction('media_previous_track')">
        <img src="/icons/previous.svg">
      </v-btn>
      <v-btn class="card-button" outline medium fab @click="playOrPause">
        <img :src="playIcon">
      </v-btn>
      <v-btn class="card-button" outline medium fab @click="mediaAction('media_next_track')">
        <img src="/icons/next.svg">
      </v-btn>
    </v-layout>

    <img class="card-icon-bg" src="/icons/spotify_lg.svg">
  </v-card>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
      mediaplayer: { required: true }
    },

    computed: {
      ...mapGetters({
        apiUrl: 'getApiUrl'
      }),
      mediaPicture () {
        return `${this.apiUrl}${this.mediaplayer.attributes.entity_picture}`
      },
      playIcon () {
        return this.mediaplayer.state === 'playing' ? '/icons/pause.svg' : '/icons/play.svg'
      }
    },

    methods: {
      playOrPause () {
        if (this.mediaplayer.state === 'playing') {
          this.mediaAction('media_pause')
          return
        }
        this.mediaAction('media_play')
      },
      mediaAction (action) {
        this.$store.dispatch({
          type: 'mediaAction',
          id: this.mediaplayer.entity_id,
          action: action
        })
      }
    }
  }
</script>

<style>
  #media-card {
    background-color: #D3B8AF;
  }

  #media-picture {
    border: 3px solid rgba(255, 255, 255, 0.5);
  }
</style>