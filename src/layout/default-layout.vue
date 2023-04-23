<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
        <div class="container-fluid">
            <!-- Product Page -->
            <div class="d-flex flex-row justify-content-start">
                <router-link to="/product">
                    <button type="button" class="btn btn-secondary">
                                    Product
                                </button>
                </router-link>
                <div v-if="isAdmin === 'true' " class="ms-4">
                    <router-link to="/logs">
                        <button type="button" class="btn btn-secondary">
                                    Logs
                                </button>
                    </router-link>
                </div>
            </div>
            <!-- Right Side -->
            <div class="d-flex flex-row justify-content-end">
                <!-- User Dropdown -->
                <div class="dropdown me-3">
                    <button class="btn btn-secondary dropdown-toggle" type="button" id="userDropdown" data-bs-toggle="dropdown" aria-expanded="false">
                                           {{ user }}
                                        </button>
                    <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="userDropdown">
                        <li><a class="dropdown-item" @click="logout()">Logout</a></li>
                    </ul>
                </div>
                <!-- Cart Button -->
                <router-link to="/cart">
                    <button class="btn btn-outline-success me-3" type="button">
                                        <i class="bi bi-cart-fill me-1"></i>
                                        Cart
                            </button>
                </router-link>
            </div>
        </div>
    </nav>
    <div>
        <router-view></router-view>
    </div>
</template>

<script>
    import router from '@/router';
    import {
        JwtService
    } from '@/services/JwtService';
    export default {
        setup() {
            const isAdmin = JwtService.getAdmin()
            const logout = () => {
                JwtService.destroyToken()
                router.push({
                    name: 'Login'
                })
            }
            const user = JwtService.getUser()
            return {
                isAdmin,
                logout,
                user
            }
        }
    }
</script>