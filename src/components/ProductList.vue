<template>
  <div class="px-4 mx-auto">
    <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
      <div
        v-for="product in products"
        :key="product.id"
        class="overflow-hidden transition-transform transform bg-white rounded-lg shadow-lg hover:scale-105"
      >
        <img :src="product.image" :alt="product.name" class="object-cover w-full h-56" />
        <div class="p-6">
          <h3 class="mb-2 text-lg font-semibold">{{ product.name }}</h3>
          <p class="mb-2 text-gray-700">
            價格：<span class="font-bold">{{ product.price }}元</span>
          </p>
          <p class="mb-4 text-gray-500">最多購買：{{ product.maxQuantity }}件</p>
          <button
            @click="addToCart(product)"
            class="w-full py-2 font-semibold text-white transition-colors duration-300 bg-blue-500 rounded-lg hover:bg-blue-600"
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
          name: '外接硬碟',
          price: 1599,
          image: 'https://picsum.photos/id/10/200',
          maxQuantity: 10
        },
        {
          id: 10,
          name: '顯示器',
          price: 2799,
          image: 'https://picsum.photos/id/9/200',
          maxQuantity: 7
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

<style scoped></style>
