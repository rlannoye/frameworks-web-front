<template>
  <div id="app">
    <header>
      <b-form class="haut">
        <div id="logo">
          <b-img :src="require('./assets/logo.png')" fluid alt="Responsive image"/>
        </div>
        <magic-logger class="magic-logger"
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

    export default {
        name: 'app',
        data: function(){
            return{
                user:new User(),
            }
        },
        components:{
            "magic-logger": MagicLogger,
            "user-information": UserInformation
        },
        methods: {
            userLoggedIn: function (user) {
                console.log("connected", user)
                this.user = user;
            },
            userLoggedOut: function (user) {
                console.log("disconnected", user)
                this.user = user;
            },
            userMutated: function (newUser){
                this.user.fromJSON(newUser.jsonify())
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