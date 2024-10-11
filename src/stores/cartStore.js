import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'

export const useCartStore = defineStore('cart', () => {
  const items = ref(JSON.parse(localStorage.getItem('cartItems')) || [])
  const discountCode = ref(localStorage.getItem('discountCode') || null)
  const appliedDiscount = ref(Number(localStorage.getItem('appliedDiscount')) || 0)
  const discountError = ref(null)

  const discountCodes = [
    {
      code: 'SAVE10',
      type: 'percentage',
      value: 10
    },
    {
      code: 'SAVE20',
      type: 'percentage',
      value: 20
    },
    {
      code: 'MINUS100',
      type: 'fixed',
      value: 100
    },
    {
      code: 'MINUS500',
      type: 'fixed',
      value: 500
    }
  ]

  const totalPrice = computed(() =>
    items.value.reduce((sum, product) => sum + product.price * product.quantity, 0)
  )

  const finalPrice = computed(() => {
    // 防止折扣超過總價，最小值為 0
    return Math.max(0, totalPrice.value - appliedDiscount.value)
  })

  const applyDiscountCode = (code) => {
    const discount = discountCodes.find((discount) => discount.code === code)
    if (discount) {
      discountCode.value = code
      discountError.value = null
      if (discount.type === 'percentage') {
        appliedDiscount.value = (totalPrice.value * discount.value) / 100
      } else if (discount.type === 'fixed') {
        appliedDiscount.value = discount.value
      }
      localStorage.setItem('discountCode', discountCode.value)
      localStorage.setItem('appliedDiscount', appliedDiscount.value.toString())
    } else {
      discountCode.value = null
      appliedDiscount.value = 0
      discountError.value = '無效的優惠碼'
      localStorage.removeItem('discountCode')
      localStorage.removeItem('appliedDiscount')
    }
  }

  watch(
    items,
    (newItems) => {
      localStorage.setItem('cartItems', JSON.stringify(newItems))
    },
    { deep: true }
  )

  watch([discountCode, appliedDiscount], ([newCode, newDiscount]) => {
    if (newCode) {
      localStorage.setItem('discountCode', newCode)
      localStorage.setItem('appliedDiscount', newDiscount.toString())
    } else {
      localStorage.removeItem('discountCode')
      localStorage.removeItem('appliedDiscount')
    }
  })

  return {
    items,
    discountCode,
    appliedDiscount,
    discountError,
    totalPrice,
    finalPrice,
    addToCart(product) {
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
    },
    removeProduct(productId) {
      items.value = items.value.filter((item) => item.id !== productId)
    },
    applyDiscountCode
  }
})
