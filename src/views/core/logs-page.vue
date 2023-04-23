<template>

<div class="container">
    <h1 class="text-center mt-5">Logs</h1>
    <div class="row mt-4 mb-3">
        <div class="col-md-4">
            <select class="form-select" aria-label="Filter action type" @change="filterLogsByActionType($event.target.value)">
                <option selected value="">Filter by action type...</option>
                <option v-for="(index,key) in logsAction.data" :key="key" :value="key">{{index}}</option>
            </select>
        </div>
    </div>
    <table class="table table-bordered table-striped mt-4">
        <thead>
        <tr>
            <th>User Name</th>
            <th>User Email</th>
            <th>Cart ID</th>
            <th>Product ID</th>
            <th>Product Name-Price</th>
            <th>Action Type</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="log in logs.data" :key="log.id">
            <td>{{ log.user?.name ?? "N/A"}}</td>
            <td>{{ log.user?.email ?? "N/A"}}</td>
            <td>{{ log.description.cart?.id ?? "N/A"}}</td>
            <td>{{ log.description.product?.id ?? "N/A" }}</td>
            <td>{{ log.description.product?.name ?? "N/A" }} - ${{ log.description.product?.price  ?? "N/A"}}</td>
            <td>{{ log?.event_type ?? "N/A" }}</td>
        </tr>
        </tbody>
    </table>
    <div class="container mt-3">
        <nav>
            <ul class="pagination">
                <li v-for="(link) in logs.links" :key="link.id" class="page-item" :class="link.active ? 'active' : ''" @click="getLogs(currentLogAction,link.label)">
                    <a class="page-link">
                        {{ link.label }}
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</div>

</template>

<script>
import axios from '@/axios';
import { onMounted, ref } from 'vue';
    export default {
        name:"logs-page",
        setup() {
            const logs = ref([])
            const logsAction = ref([])
            const currentLogAction = ref()
            const getLogs = (parameter = '', page) => {
                axios.get('logs?filter[event]=' + parameter + '&page=' +page )
                .then((response)=>{
                    logs.value = response.data
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            const getLogsAction = () => {
                axios.get('/logs/actions')
                .then((response) => {
                    logsAction.value = response.data
                })
                .catch((err)=>{
                    console.log(err)
                })
            }
            const filterLogsByActionType = (type) =>{
                currentLogAction.value = type
                getLogs(type,'')
            }
            onMounted(getLogs)
            onMounted(getLogsAction)
            return {
                logs,
                getLogs,
                logsAction,
                currentLogAction,
                filterLogsByActionType
            }
        }
       
    }
</script>