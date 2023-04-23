<template>
    <div class="container">
        <h1 class="text-center mt-5">Shopping Cart</h1>
        <table class="table table-bordered table-striped mt-4">
            <thead>
                <tr>
                    <th>Product Name</th>
                    <th>Price</th>
                    <th>Remove</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="product in cart.products" :key="product.id">
                    <td>{{ product.name }}</td>
                    <td>${{ product.price }}</td>
                    <td>
                        <button class="btn btn-danger" @click=deleteCartItem(product.id)>Remove</button>
                    </td>
                </tr>
            </tbody>
            <button v-if="doExist" @click="buyCart()" type="button" class="btn btn-info">Buy</button>
        </table>
    </div>
  
</template>

<script>
    import axios from '@/axios';
    import {
        onMounted,
        ref
    } from 'vue';
    export default {
        name: "cart-page",
        setup() {
            const cart = ref([]);
            const doExist = ref(false);
            const getCart = () => {
                axios.get('/carts')
                    .then((response) => {
                        cart.value = response.data
                        if (cart.value.products.length > 0) {
                            doExist.value = true
                        } else {
                            doExist.value = false
                        }
                        console.log()
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            const deleteCartItem = (productID) => {
                axios.post('/carts/remove-from-cart/' + cart.value.id + '/' + productID)
                    .then((response) => {
                        getCart()
                        console.log(response)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            }
            const buyCart = () => {
                axios.post('/carts/buy/' + cart.value.id)
                    .then(() => {
                        getCart()
                        doExist.value = false
                        alert('Added Succesfully')

                    })
                    .catch((err)=>{
                        alert('Error Occurred', err)
                    })
            }
            onMounted(getCart)
            return {
                cart,
                getCart,
                deleteCartItem,
                doExist,
                buyCart
            }
        }
    }
</script>