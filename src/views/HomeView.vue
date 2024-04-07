<script setup>
import HeaderComponent from '@/components/headerComponent.vue'
import QuizRowComponent from '@/components/quizRowComponent.vue'
import CloudAnimationComponent from '@/components/cloudAnimationComponent.vue'
import FooterComponent from '@/components/footerComponent.vue'

import { onMounted, ref } from 'vue'
import { useQuizStore } from '@/stores/quizStore.js'

const store = useQuizStore()


const quizMap = ref(null)

onMounted(async () => {
  await store.fetchQuizzes()
  quizMap.value = store.quizzes.content
})
</script>

<template>
  <header-component></header-component>
  <div v-if="quizMap !== null" class="home-main">
    <div class="image-container">
      <div class="hidden-text">
        <div class="logo">PeakQuiz</div>
        <h1>Peak Your Knowledge</h1>
      </div>
      <cloud-animation-component></cloud-animation-component>
    </div>
    <div class="quizzes">
      <quiz-row-component :row-name="'Recent'" :quiz-map="quizMap"></quiz-row-component>
    </div>
  </div>
  <footer-component></footer-component>
</template>

<style scoped>
.image-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 400px;
  background-image: url('@/assets/login-mountains.png');
  background-size: cover;
  background-position: 50% 40%;
  background-repeat: no-repeat;
}

.hidden-text {
  position: absolute;
  text-align: center;
}

.logo {
  font-size: 40px;
  font-weight: bold;
  margin-right: 20px;
}
</style>