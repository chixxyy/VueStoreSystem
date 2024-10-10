<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center mb-12">商品購物車</h1>

    <div class="flex flex-col md:flex-row justify-between">
      <!-- 商品列表 -->
      <div class="w-full md:w-2/3 mb-8">
        <ProductList @add-to-shopcart="addToCart" />
      </div>

      <!-- 購物車 -->
      <div class="w-full md:w-1/3">
        <ShopCart :shopcart="shopcart" />
      </div>
    </div>
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import ShopCart from './components/ShopCart.vue'

export default {
  components: {
    ProductList,
    ShopCart
  },
  data() {
    return {
      shopcart: []
    }
  },
  methods: {
    addToCart(product) {
      const cartItem = this.shopcart.find((item) => item.id === product.id)
      if (cartItem) {
        if (cartItem.quantity < product.maxQuantity) {
          cartItem.quantity++
        } else {
          alert('已達購買上限')
        }
      } else {
        this.shopcart.push({ ...product, quantity: 1 })
      }
    }
  }
}
</script>
