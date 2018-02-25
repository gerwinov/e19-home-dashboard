<template>
  <v-card color="green accent-3" dark flat tile ripple>
    <v-card-title primary class="title" v-text="'Spotify'"></v-card-title>
    <v-layout row>
      <v-flex xs7>
        <v-card-text>
          <div class="title" v-text="mediaplayer.attributes.media_title"></div>
          <div v-text="mediaplayer.attributes.media_artist"></div>
        </v-card-text>
      </v-flex>
      <v-flex xs5>
        <v-card-media :src="mediaPicture" contain height="110px"></v-card-media>
      </v-flex>
    </v-layout>
    <v-flex>
      <v-card-actions>
        <v-btn icon @click="mediaAction('media_previous_track')">
          <v-icon x-large>skip_previous</v-icon>
        </v-btn>
        <v-btn icon @click="playOrPause">
          <v-icon x-large v-text="playIcon"></v-icon>
        </v-btn>
        <v-btn icon @click="mediaAction('media_next_track')">
          <v-icon x-large>skip_next</v-icon>
        </v-btn>
        <v-spacer></v-spacer>
        <v-btn icon @click="mediaAction('volume_down')">
          <v-icon x-large>volume_down</v-icon>
        </v-btn>
        <v-btn icon @click="mediaAction('volume_up')">
          <v-icon x-large>volume_up</v-icon>
        </v-btn>
      </v-card-actions>
    </v-flex>
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
        return this.mediaplayer.state === 'playing' ? 'pause' : 'play_arrow'
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
