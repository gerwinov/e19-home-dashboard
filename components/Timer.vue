<template>
  <v-card color="teal lighten-2" dark flat tile>
    <v-layout row nowrap>
      <v-flex xs7>
        <v-card-text>
          <span class="title" v-text="'Timer'"></span>
          <h1 class="display-3" v-text="timer"></h1>
        </v-card-text>
      </v-flex>

      <v-flex xs5>
        <v-card-text>
          <span class="title" v-text="date"></span>
          <h1 class="display-3" v-text="time"></h1>
        </v-card-text>
      </v-flex>
    </v-layout>

    <v-layout row nowrap>
      <v-flex xs12>
        <v-btn outline large fab color="white" v-if="timerInterval" @click.native="stopTimer">
          <v-icon>timer_off</v-icon>
        </v-btn>
        <v-btn outline large fab color="white" v-if="!timerInterval" @click.native="startTimer">
          <v-icon>timer</v-icon>
        </v-btn>
        <v-btn outline large fab color="white" v-if="!timerInterval" @click.native="increateTimer">
          <v-icon>add</v-icon>
        </v-btn>
        <v-btn outline large fab color="white" v-if="!timerInterval" @click.native="decreaseTimer">
          <v-icon>remove</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>

    <v-dialog v-model="dialog" persistent max-width="500px">
      <v-card>
        <v-card-title>
          <h1 class="headline" v-text="'Timer gereed'"></h1>
        </v-card-title>
        <audio ref="audio" src="timer_ends.wav" type="audio/wav"></audio>
        <v-flex>
          <v-card-actions>
            <v-btn color="warning" block large flat @click.stop="hideDialog">Stop</v-btn>
          </v-card-actions>
        </v-flex>
      </v-card>
    </v-dialog>
  </v-card>
</template>

<script>
  import moment from 'moment'

  export default {
    data () {
      return {
        interval: null,
        timerInterval: null,
        time: null,
        date: null,
        timerDuration: null,
        dialog: false
      }
    },

    computed: {
      timer () {
        if (this.timerDuration) {
          if (this.timerInterval && this.timerDuration.asSeconds() === -1) {
            this.dialog = true
            this.$refs.audio.play()
            this.stopTimer()
          }
          return this.timerDuration.minutes() + ':' + ('0' + this.timerDuration.seconds()).slice(-2)
        }
      }
    },

    methods: {
      increateTimer () {
        if (this.timerDuration.minutes() < 59) {
          this.timerDuration.add(moment.duration(1, 'minutes'))
        }
      },
      decreaseTimer () {
        if (this.timerDuration.minutes() > 0) {
          this.timerDuration.subtract(moment.duration(1, 'minutes'))
        }
      },
      startTimer () {
        if (this.timerDuration.minutes() > 0) {
          this.timerInterval = setInterval(() => {
            this.timerDuration.subtract(moment.duration(1, 'seconds'))
          }, 1000)
        }
      },
      stopTimer () {
        clearInterval(this.timerInterval)
        this.timerInterval = null
        this.timerDuration = moment.duration(0, 'minutes')
      },
      hideDialog () {
        this.dialog = false
        this.$refs.audio.pause()
        this.$refs.audio.currentTime = 0
      }
    },

    mounted () {
      moment.locale('nl')

      this.timerDuration = moment.duration(0, 'minutes')

      this.interval = setInterval(() => {
        this.date = moment().format('D MMMM YYYY')
        this.time = moment().format('HH:mm')
      }, 1000)
    },

    destroyed () {
      clearInterval(this.interval)
      clearInterval(this.timerInterval)
    }
  }
</script>