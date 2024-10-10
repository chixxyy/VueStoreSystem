<template>
  <div>
    <ProductList @add-to-cart="addToCart" />
    <Cart :cart="cart" />
  </div>
</template>

<script>
import ProductList from './components/ProductList.vue'
import Cart from './components/Cart.vue'

export default {
  components: {
    ProductList,
    Cart
  },
  data() {
    return {
      cart: []
    }
  },
  methods: {
    addToCart(product) {
      const cartItem = this.cart.find((item) => item.id === product.id)
      if (cartItem) {
        if (cartItem.quantity < product.maxQuantity) {
          cartItem.quantity++
        } else {
          alert('已達購買上限')
        }
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
    }
  }
}
</script>
