<template>
  <div class="p-6 bg-white rounded-lg shadow-md">
    <h1 class="mb-6 text-3xl font-bold text-center">購物車</h1>

    <div v-if="shopcart.length === 0" class="mb-4 text-center text-gray-500">購物車是空的</div>

    <div v-for="product in shopcart" :key="product.id" class="pb-4 mb-4 border-b">
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

    <div class="mt-6 mb-4">
      <input
        v-model="discountCode"
        placeholder="輸入優惠碼"
        class="w-full p-2 mb-2 border rounded-lg"
      />
      <button
        @click="applyDiscount"
        class="w-full py-2 font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
      >
        應用優惠碼
      </button>
    </div>

    <p class="text-lg font-semibold text-right">
      總價：<span class="text-blue-600">{{ totalPrice }}元</span>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    shopcart: Array
  },
  data() {
    return {
      discountCode: '',
      discountCodes: [
        { code: 'SAVE10', type: 'percentage', value: 10 },
        { code: 'SAVE20', type: 'percentage', value: 20 },
        { code: 'MINUS100', type: 'fixed', value: 100 },
        { code: 'MINUS500', type: 'fixed', value: 500 }
      ],
      discount: 0
    }
  },
  computed: {
    totalPrice() {
      let total = this.shopcart.reduce((sum, product) => sum + product.price * product.quantity, 0)
      return total - this.discount
    }
  },
  methods: {
    applyDiscount() {
      const code = this.discountCodes.find((c) => c.code === this.discountCode)
      if (code) {
        if (code.type === 'percentage') {
          this.discount =
            (this.shopcart.reduce((sum, product) => sum + product.price * product.quantity, 0) *
              code.value) /
            100
        } else if (code.type === 'fixed') {
          this.discount = code.value
        }
      } else {
        alert('無效的優惠碼')
        this.discount = 0
      }
    },
    increaseQuantity(product) {
      if (product.quantity < product.maxQuantity) {
        product.quantity++ // 只有當數量未達上限時才能增加
      } else {
        alert(`已達最大購買數量 ${product.maxQuantity}`)
      }
    },
    decreaseQuantity(product) {
      if (product.quantity > 1) {
        product.quantity-- // 減少數量
      } else {
        this.removeProduct(product.id) // 如果數量為 1，則刪除
      }
    },
    removeProduct(productId) {
      this.$emit('remove-product', productId) // 向父組件發送刪除事件
    }
  }
}
</script>

<style scoped>
/* 可以添加您自己的樣式 */
</style>
