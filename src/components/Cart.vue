<template>
  <div>
    <h1>購物車</h1>
    <div v-for="product in cart" :key="product.id">
      <h3>{{ product.name }}</h3>
      <p>價格：{{ product.price }}元</p>
      <p>數量：{{ product.quantity }}</p>
    </div>

    <div>
      <input v-model="discountCode" placeholder="輸入優惠碼" />
      <button @click="applyDiscount">應用優惠碼</button>
    </div>

    <p>總價：{{ totalPrice }}元</p>
  </div>
</template>

<script>
export default {
  props: {
    cart: Array
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
      let total = this.cart.reduce((sum, product) => sum + product.price * product.quantity, 0)
      return total - this.discount
    }
  },
  methods: {
    applyDiscount() {
      const code = this.discountCodes.find((c) => c.code === this.discountCode)
      if (code) {
        if (code.type === 'percentage') {
          this.discount =
            (this.cart.reduce((sum, product) => sum + product.price * product.quantity, 0) *
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
