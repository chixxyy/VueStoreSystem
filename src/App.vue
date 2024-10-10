<template>
  <div class="container p-4 mx-auto">
    <h1 class="mb-12 text-4xl font-bold text-center">商品購物車</h1>

    <div class="flex flex-col justify-between md:flex-row">
      <div class="w-full mb-8 md:w-2/3">
        <ProductList @add-to-shopcart="addToCart" />
      </div>

      <div class="w-full md:w-1/3">
        <ShopCart :shopcart="shopcart" @remove-product="removeFromCart" />
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
    },
    removeFromCart(productId) {
      this.shopcart = this.shopcart.filter((item) => item.id !== productId)
    }
  }
}
</script>
