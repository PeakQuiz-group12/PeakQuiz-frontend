<script setup>
import { useRouter } from 'vue-router'

const { quizName, imageUrl } = defineProps(["quizName", "imageUrl"])
const router = useRouter()

const navigateToPlayQuiz = () => {
  router.push('/playQuiz');
};
</script>

<template>
  <div class="quiz-card-main" @click="navigateToPlayQuiz">
    <img :src="imageUrl" alt="quiz image">
    <h2>{{ quizName }}</h2>
  </div>
</template>

<style scoped>
.quiz-card-main {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  border: solid 2px black;
  cursor: pointer;
  background-color: #C7EEFF;
  margin-right: 10px;
}

.quiz-card-main h2 {
  margin-bottom: 20px;
  border-bottom: solid 2px black;
}

.quiz-card-main img {
  width: 200px;
  margin: 20px;
  border-radius: 5px;
}
</style>