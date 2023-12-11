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
const orders = ref([])
const usersRef = collection(db, 'a-orders')

const getQuery = async (qry) => {
    orders.value = []
    const querySnap = await getDocs(qry)
    querySnap.forEach(async (doc) => {
        let data = doc.data()
        data.id = doc.id
        orders.value.push(data)
    })
}

const getOrder = async () => {
    const qry = query(usersRef, where("userId", "==", route.params.id))

    return await getQuery(qry)

}

onMounted(() => {
    
    getOrder()
    


})

</script>
 
<template>
    <div >
            <div class="bg-green-200  text-center p-8 ">
                <div class="text-3xl ">{{ $route.params.id }}</div>
                <div v-if="orders.length == 0" class="text-xl ">No Orders</div>
                
                <div v-for="order in orders " class="grid grid-cols-2 gap-4">
                    <div class="">{{ order.gameId }}</div>
                    <div>{{  new Date(order.orderAt.seconds * 1000 + order.orderAt.nanoseconds / 1000000,).toDateString() }}</div>
                </div>    
            
            
            </div>
        </div>
</template>
 
<style scoped>

</style>