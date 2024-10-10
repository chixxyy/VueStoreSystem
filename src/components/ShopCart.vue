<template>
  <div class="bg-white shadow-md rounded-lg p-6">
    <h1 class="text-3xl font-bold text-center mb-6">購物車</h1>

    <div v-for="product in shopcart" :key="product.id" class="mb-4 border-b pb-4">
      <h3 class="text-xl font-semibold">{{ product.name }}</h3>
      <p class="text-gray-700">
        價格：<span class="font-bold">{{ product.price }}元</span>
      </p>
      <p class="text-gray-500">
        數量：<span class="font-bold">{{ product.quantity }}</span>
      </p>
    </div>

    <div class="mt-6 mb-4">
      <input
        v-model="discountCode"
        placeholder="輸入優惠碼"
        class="border rounded-lg p-2 w-full mb-2"
      />
      <button
        @click="applyDiscount"
        class="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
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
    }
  }
}
</script>

<style scoped>
/* Optional: Custom styles can be added here */
</style>
