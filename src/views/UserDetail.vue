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
const route = useRoute()
const users = ref({})
const usersRef = collection(db, 'a-users')

const getQuery = async (qry) => {
    users.value = {}
    const querySnap = await getDocs(qry)
    querySnap.forEach(async (doc) => {
        let data = doc.data()
        data.id = doc.id
        users.value = data
    })
}

const getDetailByUsername = async () => {
    const qry = query(usersRef, where("username", "==", route.params.id))

    return await getQuery(qry)

}

onMounted(() => {
    getDetailByUsername(route.params.id)
    

   
})
</script>
 
<template>
    <div class="grid grid-cols-1 gap-4">
        <div class="bg-green-200  text-center p-8 ">
            <ul >
                <li class="text-3xl ">{{ users.username }}</li>
                <li class="">{{ users.name }}</li>
                <li class="">{{ users.phone }}</li>
                <li class="">{{ users.email }}</li>
                <li class="">{{ new Date(users.registeredAt?.seconds * 1000 + users.registeredAt?.nanoseconds / 1000000,).toDateString() }}</li>
                
                <div class="flex justify-center space-x-2">
                    <RouterLink class="bg-blue-200" :to="{ name: 'userbycountry', params: { id: users.address?.country } }">
                        
                            {{ users.address?.country }}
                    </RouterLink>
                    <RouterLink class="bg-blue-300" :to="{ name: 'userbycountry', params: { id: users.address?.country } }">
                        
                        {{ users.address?.city }}
                    </RouterLink>
                    <li >
                        
                        {{ users.address?.street }}
                    </li>
                </div>
                <RouterLink :to="{name: 'orders', params: { id: users.username } } " class="bg-yellow-200">Orders</RouterLink>
            </ul>
            
            
        </div>
    </div>
</template>
 
<style scoped></style>