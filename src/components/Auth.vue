<template>
  <div
    class="fixed z-10 inset-0 overflow-y-auto"
    id="modal"
    :class="{ hidden: !authModalShow }"
  >
    <div class="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center
      sm:block sm:p-0">
      <div class="fixed inset-0 transition-opacity">
        <div class="absolute inset-0 bg-gray-800 opacity-75"></div>
      </div>

      <!-- This element is to trick the browser into centering the modal contents. -->
      <span class="hidden sm:inline-block sm:align-middle sm:h-screen">&#8203;</span>

      <div class="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden
        shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">

        <!-- Add margin if you want to see some of the overlay behind the modal-->
        <div class="py-4 text-left px-6">
          <!--Title-->
          <div class="flex justify-between items-center pb-4">
            <p class="text-2xl font-bold">Your Account</p>
            <!-- Modal Close Button -->
            <div class="modal-close cursor-pointer z-50" @click.prevent="toggleAuthModal">
              <i class="fas fa-times"></i>
            </div>
          </div>

          <!-- Tabs -->
          <ul class="flex flex-wrap mb-4">
            <li
              class="flex-auto text-center"
              v-for="tab in tabs"
              :key="tab"
            >
              <a class="block rounded py-3 px-4 transition"
                :class="{
                  'hover:text-white text-white bg-blue-600': currentTab === tab.title,
                  'hover:text-blue-600': currentTab !== tab.title,
                }"
                href="#"
                @click="currentTab = tab.title"
                >{{ tab.title }}</a>
            </li>
          </ul>
          <keep-alive>
            <component :is="currentTabComponent" />
          </keep-alive>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import TabRegister from './RegisterForm.vue';
import TabLogin from './AuthForm.vue';

export default {
  name: 'Auth',
  components: {
    TabRegister,
    TabLogin,
  },
  data() {
    return {
      currentTab: 'Login',
      tabs: [
        {
          title: 'Login',
          component: TabLogin,
        },
        {
          title: 'Register',
          component: TabRegister,
        },
      ],
    };
  },
  computed: {
    ...mapState(['authModalShow']),
    currentTabComponent() {
      return `Tab${this.currentTab}`;
    },
  },
  methods: {
    ...mapMutations(['toggleAuthModal']),
  },
};
</script>

<style>

</style>
