<template>
  <v-dialog v-model="displayDialog" persistent max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline" v-text="'Home assistant login'"></span>
      </v-card-title>
      <v-card-text>
        <v-container grid-list-md>
          <v-layout wrap>
            <v-flex xs12>
              <v-text-field label="Adres" type="text" required v-model="address"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Poort" type="number" required v-model="port"></v-text-field>
            </v-flex>
            <v-flex xs12>
              <v-text-field label="Wachtwoord" type="password" required v-model="password"></v-text-field>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" flat @click.native="login">Login</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    data () {
      return {
        address: '',
        port: 8123,
        password: ''
      }
    },

    computed: {
      ...mapGetters({
        isLoggedIn: 'isLoggedIn'
      }),
      displayDialog () {
        return this.isLoggedIn === false
      }
    },

    methods: {
      login () {
        this.$store.commit({
          type: 'login',
          address: this.address,
          port: this.port,
          password: this.password
        })
      }
    }
  }
</script>