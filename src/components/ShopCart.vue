<template>
  <div class="p-6 mx-4 bg-blue-200 rounded-lg shadow-md">
    <h1 class="mb-6 text-3xl font-bold text-center">購物車</h1>

    <div v-if="cartItems.length === 0" class="mb-4 text-center text-gray-500">購物車目前空空的</div>

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

    <div class="mt-4">
      <input
        v-model="discountInput"
        type="text"
        placeholder="輸入優惠碼"
        class="px-4 py-2 border rounded"
      />
      <button @click="applyDiscount" class="p-2 mt-2 text-white bg-blue-500 rounded">
        使用優惠碼
      </button>
    </div>

    <p v-if="discountError" class="mt-2 text-red-500">{{ discountError }}</p>

    <p v-if="discountCode" class="mt-2 text-green-500">
      已使用優惠碼：{{ discountCode }}，節省 {{ appliedDiscount }} 元
    </p>

    <p class="mt-4 text-lg font-semibold text-right">
      總價：<span class="text-blue-600">{{ finalPrice }}元</span>
    </p>

    <button
      @click="checkout"
      class="w-full py-2 mt-6 font-semibold text-white bg-green-500 rounded-lg hover:bg-green-600"
    >
      結帳
    </button>

    <div
      v-if="showSummary"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="w-full max-w-md p-6 bg-white rounded-lg shadow-lg">
        <h2 class="mb-4 text-xl font-bold">訂單摘要</h2>
        <ul>
          <li v-for="product in cartItems" :key="product.id" class="mb-2">
            {{ product.name }} (x{{ product.quantity }}) - {{ product.price * product.quantity }} 元
          </li>
        </ul>
        <p v-if="discountCode" class="mt-2 text-green-500">
          優惠碼：{{ discountCode }}，節省 {{ appliedDiscount }} 元
        </p>
        <p class="mt-4 text-lg font-bold">最終金額：{{ finalPrice }} 元</p>
        <button
          @click="confirmCheckout"
          class="w-full py-2 mt-6 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-600"
        >
          確認結帳
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useCartStore } from '../stores/cartStore'

export default {
  setup() {
    const cartStore = useCartStore()
    const discountInput = ref('')
    const showSummary = ref(false)

    const cartItems = computed(() => cartStore.items)
    const finalPrice = computed(() => cartStore.finalPrice)
    const discountCode = computed(() => cartStore.discountCode)
    const appliedDiscount = computed(() => cartStore.appliedDiscount)
    const discountError = computed(() => cartStore.discountError)

    const applyDiscount = () => {
      cartStore.applyDiscountCode(discountInput.value)
      discountInput.value = ''
    }

    const increaseQuantity = (product) => {
      cartStore.addToCart(product)
    }

    const decreaseQuantity = (product) => {
      const existingItem = cartStore.items.find((item) => item.id === product.id)
      if (existingItem && existingItem.quantity > 1) {
        existingItem.quantity -= 1
      }
    }

    const removeProduct = (productId) => {
      cartStore.removeProduct(productId)
    }

    const checkout = () => {
      showSummary.value = true
    }

    const confirmCheckout = () => {
      cartStore.items = []
      cartStore.discountCode = null
      cartStore.appliedDiscount = 0
      showSummary.value = false
      alert('結帳成功，謝謝您的購買！')
    }

    return {
      cartItems,
      finalPrice,
      discountCode,
      appliedDiscount,
      discountError,
      discountInput,
      applyDiscount,
      increaseQuantity,
      decreaseQuantity,
      removeProduct,
      checkout,
      confirmCheckout,
      showSummary
    }
  }
}
</script>

<style scoped>
.fixed {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
