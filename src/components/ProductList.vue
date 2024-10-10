<template>
  <div>
    <h1>商品列表</h1>
    <div v-for="product in products" :key="product.id">
      <img :src="product.image" :alt="product.name" />
      <h3>{{ product.name }}</h3>
      <p>價格：{{ product.price }}元</p>
      <p>最多購買：{{ product.maxQuantity }}件</p>
      <button @click="addToCart(product)">加入購物車</button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      products: [
        {
          id: 1,
          name: '智能手機',
          price: 5999,
          image: 'https://picsum.photos/id/1/200',
          maxQuantity: 5
        }
        // 其餘商品...
      ]
    }
  },
  methods: {
    addToCart(product) {
      // 添加商品到購物車
      this.$emit('add-to-cart', product)
    }
  }
}
</script>
