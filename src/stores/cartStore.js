import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('cartItems')) || [])
  const discountCode = ref(null)
  const appliedDiscount = ref(0)

  const discountCodes = [
    { code: 'SAVE10', type: 'percentage', value: 10 },
    { code: 'SAVE20', type: 'percentage', value: 20 },
    { code: 'MINUS100', type: 'fixed', value: 100 },
    { code: 'MINUS500', type: 'fixed', value: 500 }
  ]

  const totalPrice = computed(() =>
    items.value.reduce((sum, product) => sum + product.price * product.quantity, 0)
  )

  const finalPrice = computed(() => {
    const total = totalPrice.value
    return total - appliedDiscount.value
  })

  const applyDiscountCode = (code) => {
    const discount = discountCodes.find((discount) => discount.code === code)
    if (discount) {
      discountCode.value = code
      if (discount.type === 'percentage') {
        appliedDiscount.value = (totalPrice.value * discount.value) / 100
      } else if (discount.type === 'fixed') {
        appliedDiscount.value = discount.value
      }
    } else {
      discountCode.value = null
      appliedDiscount.value = 0
    }
  }

  const addToCart = (product) => {
    const existingItem = items.value.find((item) => item.id === product.id)
    if (existingItem) {
      if (existingItem.quantity < product.maxQuantity) {
        existingItem.quantity++
      } else {
        alert(`商品 ${product.name} 的最大購買數量為 ${product.maxQuantity}`)
      }
    } else {
      items.value.push({ ...product, quantity: 1 })
    }
  }

  watch(
    items,
    (newItems) => {
      localStorage.setItem('cartItems', JSON.stringify(newItems))
    },
    { deep: true }
  )

  return {
    items,
    discountCode,
    appliedDiscount,
    totalPrice,
    finalPrice,
    addToCart,
    removeProduct(productId) {
      items.value = items.value.filter((item) => item.id !== productId)
    },
    applyDiscountCode
  }
})
