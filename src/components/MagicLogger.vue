<template>
    <form class="magic-logger" @submit.prevent="connect" v-if="!connected">
        <b-form-input size="sm" type="text" v-model="login" placeholder="Login"></b-form-input>
        <b-form-input size="sm" type="password" v-model="password" placeholder="Password"></b-form-input>
        <b-button type="submit" value="Login" size="sm" :disabled="!formFilled">Login</b-button>
    </form>
    <b-dropdown v-else :text="user.nick" right>
        <b-dropdown-item @click="disconnect">Logout</b-dropdown-item>
    </b-dropdown>

</template>

<script>
    import User from "../models/User.js"

    export default {
        name: "MagicLogger",
        data: function(){
            return {
                login: '',
                password: '',
                user:undefined,
                connected: false
            }
        },
        computed: {
            formFilled: function(){
                return this.login.trim() !== '' && this.password.trim() !== '';
            }
        },
        methods: {
            connect: function (event) {
                this.user= new User();
                this.user.nick = this.login;
                this.connected= true;
                this.$emit('user-logged-in', this.user);
            },
            disconnect: function(){
                this.connected=false;
                this.$emit('user-logged-out', this.user);
                this.user = undefined;
            }
        }
    }
</script>

<style scoped>

    .magic-logger {
        display:flex;
        flex-direction: column;
    }

</style>