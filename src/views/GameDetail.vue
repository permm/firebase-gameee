<script setup>
import { useRoute, RouterLink, useRouter } from 'vue-router';
import { onMounted, ref } from 'vue';
import {
    collection,
    query,
    where,
    getDocs,
    limit,
    orderBy,
    or,
    and,
    getCountFromServer,
    doc
} from "firebase/firestore"
import db from "../firebase/init.js"

const game = ref({})
const gamesRef = collection(db, 'a-games')
const route = useRoute()

const getQuery = async (qry) => {
    game.value = {}
    const querySnap = await getDocs(qry)
    querySnap.forEach(async (doc) => {
        let data = doc.data()
        data.id = doc.id
        game.value = data
    })
    
}

const getDetailByGameTitle = async () => {
    const qry = query(gamesRef, where("title", "==", route.params.id))

    return await getQuery(qry)

}

onMounted(() => {
    getDetailByGameTitle()
})
</script>
 
<template>
    <div class="grid grid-cols-1 gap-4 bg-green-200">
        <div class="flex justify-center">
            <img :src="game.img" class="w-96 h-96  overflow-hidden" />
        </div>
        <ul class="text-center">
            <li>{{ game.title }}</li>
            <li>{{ game.description }}</li>
            <div class="flex justify-center space-x-2">
                <li v-for="platfrom in game.platforms" class="flex bg-purple-200">
                    <RouterLink :to="{ name: 'gamesbyplat', params: { id: platfrom } }">{{ platfrom }}</RouterLink>
                </li>
                <li v-for="genre in game.genre" class="flex bg-red-200">
                    <RouterLink :to="{ name: 'gamesbyelse', params: { id: genre } }">{{ genre }}</RouterLink>
                    
                </li>
                <li class="bg-orange-200">
                    <RouterLink :to="{ name: 'gamesbymul', params: { id: game.isMultiplayer } }" >{{ game.isMultiplayer ? 'Multiplayer' : 'Singleplayer' }}</RouterLink>
                    
                </li>
                <li class="flex bg-green-300">
                    <div>{{ game.price == 0 ? 'Free' : game.price + ' $' }}</div>
                </li>


            </div>
            <li>
                <div>Developer {{ game.developer }}</div>
            </li>
            <li>
                <div>Release {{ game.releaseYear }}</div>
            </li>
            <div class="flex justify-center space-x-2">
                <li class="bg-yellow-200">
                    Gameplay
                    {{ game.ratings?.gameplay }}
                    &#9733;
                </li>
                <li class="bg-yellow-200">
                    Graphics
                    {{ game.ratings?.graphics }}
                    &#9733;
                </li>
                <li class="bg-yellow-200">
                    Story
                    {{ game.ratings?.story }}
                    &#9733;
                </li>
            </div>

        </ul>


    </div>
</template>
 
<style scoped></style>