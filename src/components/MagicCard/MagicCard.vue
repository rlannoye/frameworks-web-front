<template>
    <div class="magic-card">
        <div class="card-name">{{card.name}}</div>
        <div class="card-type">{{card.type_line}}</div>
        <div class="card-artist">By {{card.artist}}</div>
    </div>
</template>

<script>
    export default {
        name: "MagicCard",
        props: {
            card: Object
        }
    }
</script>

<style scoped>

    .magic-card {
        border: 1px solid black;
        background: white ;
        display: flex;
        flex-direction: column;
    }

    .card-name{
        font-weight: bold;
    }

    .card-type{
        font-size: 0.7em;
    }

    .card-artist{
        font-size: 0.6em;
        font-style: italic;
    }

</style>