<template>
  <div id="app">
    <header>
      <b-form class="haut">
        <div id="logo">
          <b-img :src="require('./assets/logo.png')" fluid alt="Responsive image"/>
        </div>
        <magic-logger class="magic-logger"
                      :user="user"
                      v-on:user-logged-in="userLoggedIn"
                      v-on:user-logged-out="userLoggedOut"
        ></magic-logger>
      </b-form>
    </header>
    <div class="content">
      <user-information class="user-information" :user-data="user" v-on:user-mutated="userMutated"></user-information>
    </div>
  </div>
</template>

<script>
    import MagicLogger from "./components/MagicLogger"
    import UserInformation from "./components/Userinformation/UserInformation"
    import User from "./models/User.js"

    import Vue from "vue"
    import Vuex from "vuex"
    Vue.use(Vuex)

    const UPDATE_USER = "UPDATE_USER";
    const UPDATE_USER_WITH_PROMISE= "UPDATE_USER_WITH_PROMISE";

    const store = new Vuex.Store({
        state: {
            user: new User()
        },
        getters: {
            user: state => {
                return state.user;
            }
        },
        mutations: {
            [UPDATE_USER](context, json) {
                state.user.fromJSON(json);
            }
        },
        actions: { // leur déclenchement peut être asynchrone eg. en utilisant un setTimeout (ou un appel serveur...)
            [UPDATE_USER](context, json) {

                // OK : ICI LE "setTimeout" NE SERT À RIEN, C'EST POUR L'EXEMPLE !
                setTimeout(() => {
                    context.commit(UPDATE_USER, json)
                }, 1000)
            },
            [UPDATE_USER_WITH_PROMISE]({ commit }, json){ // une autre notation pour avoir le commit directement

                // OK : ICI LE "setTimeout" NE SERT À RIEN, C'EST POUR L'EXEMPLE !
                return new Promise((resolve, reject) => { // on peut créer une Promise qui sera utilisée dans le dicpatch
                    setTimeout(() => {
                        commit(UPDATE_USER, json)
                        resolve() // indique à l'appelant que c'est fini (dans le .then)
                    }, 1000)
                })
            }
        }
    });

    export default {
        name: 'app',
        store,
        computed: {
            user : function (){
                return this.$store.getters.user ;
            }
        },
        components: {
            'magic-logger': MagicLogger,
            'user-information' : UserInformation
        },
        methods: {
            userLoggedIn: function (user) {
                this.$store.dispatch(UPDATE_USER, user.jsonify())
            },
            userLoggedOut: function (user) {
                this.$store.dispatch(UPDATE_USER, new User().jsonify())
            },
            userMutated: function (newUser) {
                this.$store.dispatch(UPDATE_USER_WITH_PROMISE, newUser.jsonify()).then(() =>{
                    console.log(UPDATE_USER_WITH_PROMISE, " done !")
                })
            }
        }


    }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    color: #2c3e50;
  }

  #logo{
    display:flex;
    width: 20%;
    max-height: 200px;
    margin-right: 20%;
    background-size: contain;
    background-position: left; /*left*/
    background-repeat: no-repeat;
  }

  .haut {
    display:flex;
    justify-content: center;
  }



  header{
    display:flex;
    background-color:dimgrey;
    min-height: 100px;
    flex-direction: row;
    margin-bottom: 60px;
  }
</style>

