import Vuex from 'vuex'
import { createConnection, subscribeEntities } from 'home-assistant-js-websocket'

const createStore = () => {
  return new Vuex.Store({
    state: {
      addresss: null,
      port: null,
      password: null,
      entities: null,
      connection: null,
      sidebar: false
    },

    mutations: {
      toggleSidebar (state) {
        state.sidebar = !state.sidebar
      },

      login (state, payload) {
        if (payload.address && payload.port && payload.password) {
          state.address = payload.address
          state.port = payload.port
          state.password = payload.password

          createConnection(`ws://${payload.address}:${payload.port}/api/websocket`, { authToken: payload.password })
            .then((conn) => {
              subscribeEntities(conn, entities => {
                state.connection = conn
                state.entities = entities

                conn.getServices()
                  .then((response) => {
                    // Enable for development purposes
                    // console.log(entities)
                    // console.log(response)
                  })
              })
            },
            err => {
              console.error('Connection failed with code', err)
            })
        }
      },

      flipSwitch (state, payload) {
        if (payload.id && payload.action) {
          state.connection.callService('switch', payload.action, {
            'entity_id': payload.id
          })
        }
      },

      toggleLight (state, payload) {
        if (payload.id && payload.action) {
          state.connection.callService('light', payload.action, {
            'entity_id': payload.id
          })
        }
      },

      mediaAction (state, payload) {
        if (payload.id && payload.action) {
          state.connection.callService('media_player', payload.action, {
            'entity_id': payload.id
          })
        }
      },

      toggleThermostat (state, payload) {
        if (payload.id && payload.action && payload.operationMode) {
          state.connection.callService('climate', payload.action, {
            'entity_id': payload.id,
            'operation_mode': payload.operationMode
          })
        }
      }
    },

    getters: {
      isLoggedIn: state => {
        return state.address !== null && state.port !== null && state.password !== null
      },
      getApiUrl: state => {
        if (state.address !== null && state.port !== null) {
          return `http://${state.address}:${state.port}`
        }
      },
      getSwitches: state => {
        let items = []

        if (state.entities) {
          state.entities['group.all_switches'].attributes.entity_id.forEach((entity) => {
            if (state.entities.hasOwnProperty(entity)) {
              return items.push(state.entities[entity])
            }
          })
        }

        return items
      },
      getLights: state => {
        let items = []

        if (state.entities) {
          state.entities['group.all_lights'].attributes.entity_id.forEach((entity) => {
            if (state.entities.hasOwnProperty(entity)) {
              return items.push(state.entities[entity])
            }
          })
        }

        return items
      },
      getTrackers: state => {
        let items = []

        if (state.entities) {
          state.entities['group.all_devices'].attributes.entity_id.forEach((entity) => {
            if (state.entities.hasOwnProperty(entity)) {
              return items.push(state.entities[entity])
            }
          })
        }

        return items
      },
      getClimate: state => {
        if (state.entities) {
          return state.entities['climate.toon']
        }
      },
      getMediaplayer: state => {
        if (state.entities) {
          return state.entities['media_player.spotify']
        }
      },
      getTemperature: state => {
        if (state.entities) {
          return state.entities['sensor.schiphol_temperature'].state
        }
      },
      getWeatherDescription: state => {
        if (state.entities) {
          return state.entities['sensor.schiphol_symbol'].state
        }
      }
    }
  })
}

export default createStore
