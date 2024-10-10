<template>
  <div class="container p-4 mx-auto">
    <h1 class="mb-12 text-4xl font-bold text-center">商品購物車</h1>

    <div class="flex flex-col justify-between md:flex-row">
      <div class="w-full mb-8 md:w-2/3">
        <ProductList @add-to-shopcart="addToCart" />
      </div>

      <div class="w-full md:w-1/3">
        <ShopCart />
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import ShopCart from './components/ShopCart.vue'
import { useCartStore } from './stores/cartStore'

export default {
  components: {
    ProductList,
    ShopCart
  },
  setup() {
    const cartStore = useCartStore()

    const addToCart = (product) => {
      cartStore.addToCart(product)
    }

    return { addToCart }
  }
}
</script>
