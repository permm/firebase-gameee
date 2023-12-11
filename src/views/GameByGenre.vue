<script setup>
import { ref, onMounted, watch } from "vue"
import { useRoute, RouterLink, useRouter } from 'vue-router';
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
const games = ref([])
const gamesRef = collection(db, 'a-games')
const route = useRoute()

const getQuery = async (qry) => {
    games.value = []
    const querySnap = await getDocs(qry)
    querySnap.forEach(async (doc) => {
        let data = doc.data()
        data.id = doc.id
        games.value.push(data)
    })
}

const getAllGame = async () => {
    const qry = query(gamesRef)
    return await getQuery(qry)
}
const getGameByGenre = async (genre) => {
    const qry = query(gamesRef, where("genre", "array-contains", genre))
    return await getQuery(qry)
}

onMounted(() => {
    getGameByGenre(route.params.id)
})
</script>
 
<template>
    <div class="grid grid-cols-4 gap-4">
        <div v-for="game in games" :key="game.title" class="bg-green-200 text-center ">
            <RouterLink :to="{ name: 'gamedetail', params: { id: game.title } }">
                <div class="flex justify-center">
                    <img :src="game.img" class="w-36 h-36 rounded-full overflow-hidden  " />
                </div>
                <div>{{ game.title }}</div>
                <div class="flex space-x-2 justify-center ">
                    <div class="bg-green-300">
                        {{ game.price == 0 ? 'Free' : game.price + ' $' }}
                    </div>
                    <div class="bg-yellow-200">
                        &#9733;
                        {{ game.ratings.gameplay }}
                    </div>
                </div>
                <div class="flex space-x-2 justify-center mt-1">
                    <div v-for="gamegenre in game.genre" :key="gamegenre" class="bg-red-200">
                        <RouterLink :to="{ name: 'gamesbyelse', params: { id: gamegenre } }" @click="getGameByGenre(gamegenre)">{{ gamegenre }}</RouterLink>
                    </div>
                    <div class="bg-orange-200">
                        <RouterLink :to="{ name: 'gamesbymul', params: { id: game.isMultiplayer } }" >{{ game.isMultiplayer ? 'Multiplayer' : 'Singleplayer' }}</RouterLink>
                    </div>
                </div>
            </RouterLink>
        </div>
    </div>
</template>
 
<style scoped></style>