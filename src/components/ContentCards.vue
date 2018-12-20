<template>
    <div class="content-cards">
        <h1>Cards</h1>

        <div class="cards-builder">
            <div class="magic-cards">
                <div class="list-title">
                    Magic Cards
                    <b-button-group size="sm">
                        <b-button @click="prevCards" :disabled="page <= 1"> < </b-button>
                        <b-button @click="nextCards"> > </b-button>
                    </b-button-group>
                </div>
                <magic-card v-for="card in magicCards" :card="card" :key="card.id"></magic-card>
            </div>
        </div>
    </div>
</template>

<script>
    import User from "../models/User"
    //import MagicScryfall from "../api/magic-scryfall"
    import MagicCard from "./MagicCard/MagicCard"

    export default {
        name: "UserCards",
        props: {
            user: User
        },
        data: function () {
            return {
                magicCards: [],
                page: 1
            }
        },
        components: {
            "magic-card": MagicCard
        },
        methods: {

            loadMagicCards: function(page) {
                MagicScryfall.getPage(page).then(
                    result => {
                        this.magicCards = result ;
                    }, error =>{
                        console.log("ERROR", error)
                    }
                )
            },
            prevCards: function(){
                if(this.page <= 1 ) return ;
                this.page --
                this.loadMagicCards(this.page)
            },
            nextCards: function(){
                this.page ++
                this.loadMagicCards(this.page)
            }

        },
        created: function () {
            this.loadMagicCards(this.page)
        }
    }
</script>

<style scoped>

    .content-cards{
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .cards-builder{
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: space-around;
    }

    .magic-cards {
        display: flex;
        flex-direction: column;

    }

    .list-title{
        width: 100%;
        text-align: center;
        font-size: 1.5em;
    }

    .magic-card{
        margin-bottom: 3px;
    }
</style>