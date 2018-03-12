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

      saveConnection (state, payload) {
        if (payload.connection) {
          state.address = payload.address
          state.port = payload.port
          state.password = payload.password
          state.connection = payload.connection
          state.entities = payload.entities
        }
      },

      callService (state, payload) {
        if (payload.id && payload.action && payload.name) {
          state.connection.callService(payload.name, payload.action, {
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
      },

      setLightOptions (state, payload) {
        if (payload.id && payload.action && payload.options) {
          state.connection.callService('light', payload.action, {
            'entity_id': payload.id,
            ...payload.options
          })
        }
      }
    },

    actions: {
      login ({commit}, payload) {
        if (payload.address && payload.port && payload.password) {
          return new Promise((resolve, reject) => {
            createConnection(`ws://${payload.address}:${payload.port}/api/websocket`, { authToken: payload.password })
              .then((conn) => {
                subscribeEntities(conn, entities => {
                  conn.getServices()
                    .then(() => {
                      commit('saveConnection', {
                        address: payload.address,
                        port: payload.port,
                        password: payload.password,
                        connection: conn,
                        entities: entities
                      })
                      // Enable for development purposes (add response to 'then')
                      // console.log(entities)
                      // console.log(response)
                      return resolve()
                    })
                })
              },
              err => {
                return reject(err.message || `Home assistant code: ${err}`)
              })
          })
        }
      },

      flipSwitch ({commit}, payload) {
        commit('callService', {
          ...payload,
          name: 'switch'
        })
      },

      toggleLight ({commit}, payload) {
        commit('callService', {
          ...payload,
          name: 'light'
        })
      },

      mediaAction ({commit}, payload) {
        commit('callService', {
          ...payload,
          name: 'media_player'
        })
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

      getGroupedEntities: state => name => {
        // Entities in groups don't have all attributes defined on them.
        // So we get the grouped entities from the list of normal entities.

        let items = []

        if (state.entities) {
          state.entities[`group.all_${name}`].attributes.entity_id.forEach((entity) => {
            if (state.entities.hasOwnProperty(entity)) {
              return items.push(state.entities[entity])
            }
          })
        }

        return items
      },

      getSwitches: (state, getters) => {
        return getters.getGroupedEntities('switches')
      },

      getLights: (state, getters) => {
        return getters.getGroupedEntities('lights')
      },

      getTrackers: (state, getters) => {
        return getters.getGroupedEntities('devices')
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
