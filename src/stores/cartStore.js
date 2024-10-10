import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: []
  }),
  getters: {
    totalPrice(state) {
      return state.items.reduce((sum, product) => sum + product.price * product.quantity, 0)
    }
  },
  actions: {
    addToCart(product) {
      const existingProduct = this.items.find((item) => item.id === product.id)
      if (existingProduct) {
        if (existingProduct.quantity < product.maxQuantity) {
          existingProduct.quantity++
        } else {
          alert('已達購買上限')
        }
      } else {
        this.items.push({ ...product, quantity: 1 })
      }
    },
    increaseQuantity(product) {
      const existingProduct = this.items.find((item) => item.id === product.id)
      if (existingProduct && existingProduct.quantity < product.maxQuantity) {
        existingProduct.quantity++
      } else {
        alert('已達購買上限')
      }
    },
    decreaseQuantity(product) {
      const existingProduct = this.items.find((item) => item.id === product.id)
      if (existingProduct) {
        if (existingProduct.quantity > 1) {
          existingProduct.quantity--
        } else {
          this.removeProduct(product.id)
        }
      }
    },
    removeProduct(productId) {
      this.items = this.items.filter((item) => item.id !== productId)
    }
  }
})
