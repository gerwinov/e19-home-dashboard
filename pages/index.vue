<template>
  <v-container fluid grid-list-md>
    <login></login>

    <v-layout row wrap mt-3>
      <v-flex d-flex md4 v-if="climate">
        <climate :climate="climate"></climate>
      </v-flex>

      <v-flex d-flex md2 v-if="temperature && weatherDescription">
        <weather :temperature="temperature" :weatherDescription="weatherDescription"></weather>
      </v-flex>

      <v-flex d-flex md6 v-if="isLoggedIn">
        <timer></timer>
      </v-flex>

      <v-flex sm6>
        <v-layout row wrap>
          <v-flex d-flex md4 v-for="tracker in trackers" :key="tracker.entity_id">
            <tracker :tracker="tracker"></tracker>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex d-flex md8 v-if="mediaplayer">
            <mediaplayer :mediaplayer="mediaplayer"></mediaplayer>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex sm6>
        <v-layout row wrap justify-end>
          <v-flex d-flex md4 v-for="switcher in switchers" :key="switcher.entity_id">
            <switcher :switcher="switcher"></switcher>
          </v-flex>

          <v-flex d-flex md4 v-for="light in lights" :key="light.entity_id">
            <light :light="light"></light>
          </v-flex>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Switcher from '~/components/Switcher'
import Tracker from '~/components/Tracker'
import Climate from '~/components/Climate'
import Weather from '~/components/Weather'
import Light from '~/components/Light'
import Mediaplayer from '~/components/Mediaplayer'
import Timer from '~/components/Timer'
import Login from '~/components/Login'

import { mapGetters } from 'vuex'

export default {
  components: {
    Switcher,
    Tracker,
    Climate,
    Weather,
    Light,
    Mediaplayer,
    Timer,
    Login
  },

  computed: {
    ...mapGetters({
      switchers: 'getSwitches',
      lights: 'getLights',
      trackers: 'getTrackers',
      climate: 'getClimate',
      mediaplayer: 'getMediaplayer',
      temperature: 'getTemperature',
      weatherDescription: 'getWeatherDescription',
      isLoggedIn: 'isLoggedIn'
    })
  }
}
</script>
