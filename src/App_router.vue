<template>
    <div id="app">
        <header>
            <div id="logo"></div>
            <magic-logger class="magic-logger"
                          :user="user"
                          v-on:user-logged-in="userLoggedIn"
                          v-on:user-logged-out="userLoggedOut"
            ></magic-logger>
        </header>
        <div class="content">
            <div style="width: 100% ; margin-bottom: 30px ; display: flex ; justify-content: space-around">
                <router-link to="/welcome">Homepage</router-link>
                <router-link to="/updateuser">User Information</router-link>
            </div>
            <router-view></router-view>
        </div>
    </div>
</template>

<script>

    import MagicLogger from "./components/MagicLogger" ;
    import ContentWelcome from "./components/ContentWelcome"
    import ContentUI from "./components/ContentUserInformation"
    import User from "./models/User"

    // CHANGÉ POUR RÉUTILISER DANS D'AUTRES COMPOSANTS !
    import AppStore from "./api/store"
    const store = AppStore.store ;

    const routes = [
        { path: '/welcome', component: ContentWelcome, props: { user: store.getters.user }  },
        { path: '/updateuser', component: ContentUI, props: { user: store.getters.user } },
        { path: '*', redirect: '/welcome'} // Chemin par défaut
    ]

    // npm install vue-router
    import Vue from "vue"
    import VueRouter from "vue-router"
    Vue.use(VueRouter)
    const router = new VueRouter({
        routes: routes
    })

    export default {
        name: 'app',
        store,
        router,
        computed: {
            user : function (){
                return this.$store.getters.user ;
            }
        },
        components: {
            'magic-logger': MagicLogger,
            'content-welcome' : ContentWelcome,
            'content-ui': ContentUI
        },
        methods: {
            userLoggedIn: function (user) {
                this.$store.dispatch(AppStore.UPDATE_USER, user.jsonify())
            },
            userLoggedOut: function (user) {
                this.$store.dispatch(AppStore.UPDATE_USER, new User().jsonify())
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

    header {
        background: lightslategray;
        padding: 5px ;
        margin-bottom: 30px;
        display: flex !important;
        flex-direction: row;
        align-items: center;
    }

    .content {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #logo {
        flex: 1;
        min-height: 100px ;
        max-height: 200px;
        background: url("assets/logo.png");
        background-position: left;
        background-size: contain;
        background-repeat: no-repeat;
    }

    .magic-logger {
        flex: none;
        padding: 3px;
    }

    .content-user-information{
        width: 70%;
    }
</style>



