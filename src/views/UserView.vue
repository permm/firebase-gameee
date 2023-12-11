<script setup>
import { ref, onMounted, watch } from "vue"
import { RouterLink, RouterView } from 'vue-router'
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
const users = ref([])
const usersRef = collection(db, 'a-users')

const getQuery = async (qry) => {
    users.value = []
    const querySnap = await getDocs(qry)
    querySnap.forEach(async (doc) => {
        let data = doc.data()
        data.id = doc.id
        users.value.push(data)
    })
}

const getAllUser = async () => {
    const qry = query(usersRef)
    return await getQuery(qry)
}

onMounted(() => {
    getAllUser()
})
</script>
 
<template>
    <RouterLink :to="{ name: 'userdetail', params: { id: user.username } }" class="bg-green-200 hover:bg-green-300 text-center p-8 text-3xl grid grid-cols-2 gap-4" v-for="user in users" :key="user.username">

        <div >{{ user.username }}</div>
        <div class="space-x-4">
            <RouterLink class="bg-blue-200" :to="{ name: 'userbycountry', params: { id: user.address.country } }">
                {{ user.address?.country }}
            </RouterLink>
            <RouterLink class="bg-blue-300" :to="{ name: 'userbycity', params: { id: user.address.city } }">
                {{ user.address?.city }}
            </RouterLink>
        </div>

    </RouterLink>
</template>
 
<style scoped></style>