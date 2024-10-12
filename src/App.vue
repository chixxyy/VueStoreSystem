<template>
  <div
    :class="{ dark: isDarkMode }"
    class="flex flex-col justify-between min-h-screen bg-white dark:bg-gray-900"
  >
    <header class="flex items-center justify-between p-6 mb-6 bg-blue-300 dark:bg-gray-700">
      <h1 class="text-4xl font-bold text-red-500 dark:text-white">Hero Store</h1>

      <button
        @click="toggleDarkMode"
        class="p-4 font-semibold text-white bg-blue-500 rounded-lg hover:bg-blue-700 dark:bg-gray-600 dark:hover:bg-gray-800"
      >
        {{ isDarkMode ? '切換至亮色模式' : '切換至深色模式' }}
      </button>
    </header>

    <main>
      <div class="flex flex-col justify-between md:flex-row">
        <article class="w-full mb-8 md:w-2/3">
          <ProductList @add-to-shopcart="addToCart" />
        </article>

        <aside class="w-full md:w-1/3">
          <ShopCart />
        </aside>
      </div>
    </main>

    <footer class="p-4 text-center text-gray-800 bg-blue-300 dark:bg-gray-700">
      <a
        href="https://github.com/chixxyy"
        class="font-bold text-red-500 dark:text-blue-300 hover:underline"
      >
        <p>聯絡我</p>
      </a>
    </footer>
  </div>
</template>

<script>
import { ref } from 'vue'
import ProductList from './components/ProductList.vue'
import ShopCart from './components/ShopCart.vue'
import { useCartStore } from './stores/cartStore'

export default {
  components: {
    ProductList,
    ShopCart
  },
  setup() {
    const cartStore = useCartStore()

    const isDarkMode = ref(false)

    const toggleDarkMode = () => {
      isDarkMode.value = !isDarkMode.value
      if (isDarkMode.value) {
        document.documentElement.classList.add('dark')
        localStorage.setItem('theme', 'dark')
      } else {
        document.documentElement.classList.remove('dark')
        localStorage.setItem('theme', 'light')
      }
    }

    const addToCart = (product) => {
      cartStore.addToCart(product)
    }

    return {
      addToCart,
      isDarkMode,
      toggleDarkMode
    }
  }
}
</script>
