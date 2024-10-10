<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h1 class="mb-6 text-3xl font-bold text-center">購物車</h1>

    <div v-if="cartItems.length === 0" class="mb-4 text-center text-gray-500">購物車是空的</div>

    <div v-for="product in cartItems" :key="product.id" class="pb-4 mb-4 border-b">
      <h3 class="text-xl font-semibold">{{ product.name }}</h3>
      <p class="text-gray-700">
        價格：<span class="font-bold">{{ product.price }}元</span>
      </p>
      <p class="text-gray-500">
        數量：<span class="font-bold">{{ product.quantity }}</span>
      </p>
      <div class="flex justify-between mt-2">
        <div class="flex items-center">
          <button @click="decreaseQuantity(product)" class="px-2 py-1 mr-2 bg-gray-200 rounded-lg">
            減少
          </button>
          <button @click="increaseQuantity(product)" class="px-2 py-1 bg-gray-200 rounded-lg">
            增加
          </button>
        </div>
        <button @click="removeProduct(product.id)" class="text-red-500">刪除</button>
      </div>
    </div>

    <p class="text-lg font-semibold text-right">
      總價：<span class="text-blue-600">{{ totalPrice }}元</span>
    </p>
  </div>
</template>

<script>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

export default {
  setup() {
    const cartStore = useCartStore()

    const cartItems = computed(() => cartStore.items)
    const totalPrice = computed(() => cartStore.totalPrice)

    const increaseQuantity = (product) => {
      cartStore.increaseQuantity(product)
    }

    const decreaseQuantity = (product) => {
      cartStore.decreaseQuantity(product)
    }

    const removeProduct = (productId) => {
      cartStore.removeProduct(productId)
    }

    return { cartItems, totalPrice, increaseQuantity, decreaseQuantity, removeProduct }
  }
}
</script>

<style scoped>
/* 可以添加您自己的樣式 */
</style>
