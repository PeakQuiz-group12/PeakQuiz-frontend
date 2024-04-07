<script setup>
import { useRouter } from 'vue-router'

const { quiz } = defineProps(["quiz"])
const router = useRouter()

const navigateToPlayQuiz = () => {
  router.push('/playQuiz/' + quiz.id);
};
</script>

<template>
  <div class="quiz-card-main" @click="navigateToPlayQuiz">
    <img :src="quiz.imageUrl" alt="quiz image">
    <h2>{{ quiz.title }}</h2>
  </div>
</template>

<style scoped>
.quiz-card-main {
  min-width: 150px;
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
  max-width: 200px;
  max-height: 200px;
  margin: 20px;
  border-radius: 5px;
}
</style>