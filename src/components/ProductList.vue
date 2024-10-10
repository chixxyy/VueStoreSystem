<template>
  <div class="container mx-auto p-4">
    <h1 class="text-4xl font-bold text-center mb-12">商品列表</h1>
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      <div
        v-for="product in products"
        :key="product.id"
        class="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105"
      >
        <img :src="product.image" :alt="product.name" class="w-full h-56 object-cover" />
        <div class="p-6">
          <h3 class="text-lg font-semibold mb-2">{{ product.name }}</h3>
          <p class="text-gray-700 mb-2">
            價格：<span class="font-bold">{{ product.price }}元</span>
          </p>
          <p class="text-gray-500 mb-4">最多購買：{{ product.maxQuantity }}件</p>
          <button
            @click="addToCart(product)"
            class="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
          >
            加入購物車
          </button>
        </div>
      </div>
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
        },
        {
          id: 2,
          name: '筆記電腦',
          price: 15999,
          image: 'https://picsum.photos/id/2/200',
          maxQuantity: 3
        },
        {
          id: 3,
          name: '無線耳機',
          price: 1299,
          image: 'https://picsum.photos/id/3/200',
          maxQuantity: 10
        },
        {
          id: 4,
          name: '智能手錶',
          price: 2499,
          image: 'https://picsum.photos/id/4/200',
          maxQuantity: 8
        },
        {
          id: 5,
          name: '平板電腦',
          price: 3999,
          image: 'https://picsum.photos/id/5/200',
          maxQuantity: 5
        },
        {
          id: 6,
          name: '藍牙音箱',
          price: 899,
          image: 'https://picsum.photos/id/6/200',
          maxQuantity: 15
        },
        {
          id: 7,
          name: '電競滑鼠',
          price: 599,
          image: 'https://picsum.photos/id/7/200',
          maxQuantity: 20
        },
        {
          id: 8,
          name: '機械鍵盤',
          price: 1099,
          image: 'https://picsum.photos/id/8/200',
          maxQuantity: 12
        },
        {
          id: 9,
          name: '顯示器',
          price: 2799,
          image: 'https://picsum.photos/id/9/200',
          maxQuantity: 7
        },
        {
          id: 10,
          name: '外接硬碟',
          price: 1599,
          image: 'https://picsum.photos/id/10/200',
          maxQuantity: 10
        }
      ]
    }
  },
  methods: {
    addToCart(product) {
      this.$emit('add-to-shopcart', product)
    }
  }
}
</script>

<style scoped>
/* Optional: Smooth transition for hover effects */
</style>
