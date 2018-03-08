<template>
  <v-card color="red darken-2" dark flat tile>
    <v-layout>
      <v-flex xs8>
        <v-card-title primary class="title" v-text="'Toon'"></v-card-title>

        <v-card-text>
          <h1 class="display-3" v-text="currentTemperature"></h1>
          <span>Ingestelde temperatuur:</span><br>
          <v-icon x-large>web</v-icon>
          <span v-text="targetTemperature"></span>
        </v-card-text>
      </v-flex>

      <v-flex xs4 mt-2 mr-1>
        <v-layout row wrap justify-end>
          <v-btn outline large fab color="white" @click.native="toggleThermostat('Comfort')">
            <v-icon>flash_on</v-icon>
          </v-btn>
          <v-btn outline large fab color="white" @click.native="toggleThermostat('Away')">
            <v-icon>flash_off</v-icon>
          </v-btn>
        </v-layout>
      </v-flex>
    </v-layout>
  </v-card>
</template>

<script>
  export default {
    props: {
      climate: { required: true }
    },

    computed: {
      currentTemperature () {
        return this.climate.attributes.current_temperature.toLocaleString('nl-NL') +
          this.climate.attributes.unit_of_measurement
      },
      targetTemperature () {
        return this.climate.attributes.temperature.toLocaleString('nl-NL') +
          this.climate.attributes.unit_of_measurement
      }
    },

    methods: {
      toggleThermostat (operationMode) {
        this.$store.dispatch({
          type: 'toggleThermostat',
          id: this.climate.entity_id,
          action: 'set_operation_mode',
          operationMode: operationMode
        })
      }
    }
  }
</script>
