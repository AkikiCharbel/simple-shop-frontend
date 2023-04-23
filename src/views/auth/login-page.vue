<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div v-if="data.error" class="alert alert-danger" role="alert">
                A simple danger alert—check it out!
            </div>
            <div class="col-md-6">
                <div class="card">
                    <div class="card-header">
                        Login
                    </div>
                    <div class="card-body">
                        <form>
                            <div class="mb-3">
                                <label for="email" class="form-label">Email</label>
                                <input type="text" class="form-control" id="email" name="email" v-model="data.email">
                            </div>
                            <div class="mb-3">
                                <label for="password" class="form-label">Password</label>
                                <input type="password" class="form-control" id="password" name="password" v-model="data.password">
                            </div>
                            <button type="button" @click="postLogin()" class="btn btn-primary">Login</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import router from '@/router';
    import {
        JwtService
    } from '@/services/JwtService';
    import axios from '@/axios';
    import {
        ref
    } from 'vue'
    export default {
        name: "login-page",
        setup() {
            const data = ref({})
            const postLogin = () => {
                axios.post('/login', data.value).then((response) => {
                        JwtService.saveToken(response.data.meta.access_token)
                        JwtService.setUser(response.data.name)
                        router.push({
                            name: "Product"
                        })
                    })
                    .catch((err) => {
                        data.value.error = true
                        console.log(err)
                    })
            }
            return {
                postLogin,
                data
            }
        }
    }
</script>