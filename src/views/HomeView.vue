<script setup>
import { onUnmounted } from 'vue'
import router from '@/router'
import HeaderComponent from '@/components/headerComponent.vue'
import QuizRowComponent from '@/components/quizRowComponent.vue'
import CloudAnimationComponent from '@/components/cloudAnimationComponent.vue'
import FooterComponent from '@/components/footerComponent.vue'

let quizMap = [
  { name: "Quiz 1", url: "/src/assets/test-quiz-image1.webp" },
  { name: "Quiz 2", url: "/src/assets/test-quiz-image2.webp" },
  { name: "Quiz 3", url: "/src/assets/test-quiz-image1.webp" },
  { name: "Quiz 4", url: "/src/assets/test-quiz-image2.webp" },
  { name: "Quiz 5", url: "/src/assets/test-quiz-image1.webp" },
  { name: "Quiz 6", url: "/src/assets/test-quiz-image2.webp" },
  { name: "Quiz 7", url: "/src/assets/test-quiz-image1.webp" },
  { name: "Quiz 8", url: "/src/assets/test-quiz-image2.webp" }
];

const logoutUser = async () => {
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  await router.push("/")
  console.log("Logout successful");
}
</script>

<template>
  <header-component></header-component>
  <div class="home-main">
    <div class="image-container">
      <div class="hidden-text">
        <div class="logo">PeakQuiz</div>
        <h1>Peak Your Knowledge</h1>
      </div>
      <cloud-animation-component></cloud-animation-component>
    </div>
    <div class="quizzes">
      <quiz-row-component :row-name="'Recent'" :quiz-map="quizMap"></quiz-row-component>
      <quiz-row-component :row-name="'Popular'" :quiz-map="quizMap"></quiz-row-component>
      <quiz-row-component :row-name="'History'" :quiz-map="quizMap"></quiz-row-component>
      <quiz-row-component :row-name="'Geography'" :quiz-map="quizMap"></quiz-row-component>
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