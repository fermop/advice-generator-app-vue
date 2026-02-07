<script setup>
  import { ref, onMounted, computed } from 'vue'
  import Spinner from './Spinner.vue';
  import APIService from '../services/APIService'

  const advice = ref('')
  const adviceId = ref('')

  const loading = ref(false)

  onMounted(() => {
    showAdvice()
  })

  const showAdvice = async () => {
    try {
      advice.value = ''
      adviceId.value = ''
      loading.value = true

      const {data: {slip}} = await APIService.getAdvice()    
      
      advice.value = slip.advice
      adviceId.value = slip.id
    } catch (error) {
      advice.value = 'Ups! we couldn\'t load the quote.'
      console.error(error)
    } finally {
      loading.value = false
    }
  }
</script>

<template>
  <div class="w-[90%] max-w-[33.75rem] bg-blue-900 text-center rounded-[.5rem] md:rounded-[1rem] px-[1rem] md:px-[3rem]">
    <h1 class="text-green-300 tracking-[8px] text-[.75rem] py-[3rem]">ADVICE #{{ adviceId }}</h1>

    <Spinner
      v-if="loading"
    />
    <p 
      class="text-blue-200 text-[1.75rem] font-extrabold"
      v-if="advice"
    >"{{ advice }}"</p>

    <div class="mt-[2rem] mb-[4rem] md:mt-[3rem] md:mb-[5rem]">
      <img 
        class="w-full md:hidden"
        src="/assets/images/pattern-divider-mobile.svg" alt=""
      >
      <img 
        class="w-full hidden md:block"
        src="/assets/images/pattern-divider-desktop.svg" alt=""
      >
    </div>

  </div>
  <button 
    title="Button generator"
    class="bg-green-300 p-[1.25rem] rounded-full -mt-[2rem] cursor-pointer hover:shadow-[0_0_2rem] shadow-green-300 duration-250"
    @click="showAdvice"
  >
    <img src="/assets/images/icon-dice.svg" alt="">
  </button>
</template>