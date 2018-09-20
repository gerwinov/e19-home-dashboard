<template>
  <v-container fluid grid-list-md>
    <v-layout row wrap mt-3>
      <v-flex d-flex md4 v-if="climate">
        <climate :climate="climate"></climate>
      </v-flex>

      <v-flex d-flex md3 v-if="temperature && weatherDescription">
        <weather :temperature="temperature" :weatherDescription="weatherDescription"></weather>
      </v-flex>

      <v-flex d-flex md4>
        <timer></timer>
      </v-flex>

      <v-flex d-flex md1>
        <v-layout row wrap>
          <v-flex d-flex>
            <!-- This should become a scene component! -->
            <v-card dark flat tile id="scene-card-1">
              <v-layout class="text-xs-center fill-height">
                <v-flex>
                  <img src="/icons/night.svg" class="mt-3">
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
          <v-flex d-flex>
            <!-- This should become a scene component! -->
            <v-card dark flat tile id="scene-card-2">
              <v-layout class="text-xs-center fill-height">
                <v-flex>
                  <img src="/icons/romantic.svg" class="mt-3">
                </v-flex>
              </v-layout>
            </v-card>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex sm4>
        <v-layout row wrap>
          <v-flex d-flex md6 v-for="tracker in trackers" :key="tracker.entity_id">
            <tracker :tracker="tracker"></tracker>
          </v-flex>
        </v-layout>

        <v-layout row wrap>
          <v-flex d-flex md12 v-if="mediaplayer">
            <mediaplayer :mediaplayer="mediaplayer"></mediaplayer>
          </v-flex>
        </v-layout>
      </v-flex>

      <v-flex sm8>
        <v-layout row wrap>
          <v-flex d-flex md3 v-for="switcher in switchers" :key="switcher.entity_id">
            <switcher :switcher="switcher"></switcher>
          </v-flex>

          <v-flex d-flex md3 v-for="light in lights" :key="light.entity_id">
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

import { mapGetters } from 'vuex'

export default {
  components: {
    Switcher,
    Tracker,
    Climate,
    Weather,
    Light,
    Mediaplayer,
    Timer
  },

  computed: {
    ...mapGetters({
      switchers: 'getSwitches',
      lights: 'getLights',
      trackers: 'getTrackers',
      climate: 'getClimate',
      mediaplayer: 'getMediaplayer',
      temperature: 'getTemperature',
      weatherDescription: 'getWeatherDescription'
    })
  }
}
</script>

<style scoped>
  #scene-card-1 {
    background-color: #A67589;
  }
  #scene-card-2 {
    background-color: #F9EA95;
  }
</style>
