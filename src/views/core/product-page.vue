<template>
    <!-- Products Header -->
    <div class="container mt-3">
        <div class="row">
            <div class="col-md-6">
                <h2>Products</h2>
            </div>
        </div>
    </div>
    <!-- Products Table -->
    <div class="container mt-3">
        <table class="table table-bordered table-striped mt-4">
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Add</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(product) in product.data" :key="product.id">
                    <td>{{product.name}}</td>
                    <td>${{ product.price }}</td>
                    <td>
                        <button v-if="!product.in_cart" class="btn btn-primary" @click="addToCart(product.id)">Add to Cart</button>
                        <button v-else type="button" class="btn btn-success" disabled>Added Successfully</button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <!-- Pagination -->
    <div class="container mt-3">
        <nav>
            <ul class="pagination">
                <li v-for="(link) in product.links" :key="link.id" class="page-item" :class="link.active ? 'active' : ''" @click="getProducts(link.label)">
                    <a class="page-link">
                        {{ link.label }}
                    </a>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
    import axios from '@/axios';
    import {
        onMounted,
        ref
    } from 'vue'
    export default {
        name: "product-page",
        setup() {
            const product = ref([]);
            const getProducts = (pr = null) => {
                axios.get('/products?page=' + pr)
                    .then((response) => {
                        product.value = response.data
                        console.log(product.value)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            const addToCart = (productID) => {
                axios.post('/products/add-to-cart/' + productID)
                    .then((response) => {
                        console.log(response)
                        getProducts()
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            onMounted(getProducts)
            return {
                getProducts,
                addToCart,
                product
            }
        }
    }
</script>