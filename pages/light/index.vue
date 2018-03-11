<template>
    <v-jumbotron height="800px">
    <v-container fill-height>
      <v-layout align-center>
        <v-flex>
          <h3 class="display-3">Probeer lampconfiguraties</h3>
          <span class="subheading">Kies een van de Home assistant lampen uit onderstaande lijst, vul de parameters in en druk op de knop om de instelling te bekijken.</span>
          <v-divider class="my-3"></v-divider>
          <v-layout row>
            <v-flex xs6>
              <v-select
              :items="lights"
              item-text="attributes.friendly_name"
              item-value="entity_id"
              v-model="selectedLight"
              label="Kies een lamp"
              single-line
              auto
              prepend-icon="lightbulb_outline"
              hide-details
              class="mb-4"
              color="cyan accent-4"
              ></v-select>

              <v-slider v-model="options.brightness_pct" step="1" min="0" max="100" thumb-label label="Brightness percentage" color="cyan accent-4"></v-slider>
              <v-slider v-model="options.kelvin" step="1" min="1500" max="5000" thumb-label label="Graden Kelvin" color="cyan accent-4"></v-slider>

              <v-btn large class="btn-orange ml-0" @click="setLightOptions">Uitvoeren</v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-container>
  </v-jumbotron>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  data () {
    return {
      selectedLight: null,
      options: {
        brightness_pct: 0,
        kelvin: 0
      }
    }
  },

  computed: {
    ...mapGetters({
      lights: 'getLights'
    })
  },

  methods: {
    setLightOptions (operationMode) {
      this.$store.commit({
        type: 'setLightOptions',
        id: this.selectedLight,
        action: 'turn_on',
        options: this.options
      })
    }
  }
}
</script>