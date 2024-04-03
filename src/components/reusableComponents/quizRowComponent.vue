<script setup>
import { ref } from 'vue';
import QuizCardComponent from '@/components/reusableComponents/quizCardComponent.vue';
import ArrowLeftComponent from '@/components/iconComponents/arrowLeftComponent.vue'
import ArrowRightComponent from '@/components/iconComponents/arrowRightComponent.vue'

const { rowName, quizMap } = defineProps(["rowName", "quizMap"]);

const scrollContainer = ref(null);

const scroll = (direction) => {
  if (scrollContainer.value) {
    const cardWidth = 200;
    const scrollAmount = cardWidth * 4;

    scrollContainer.value.scrollLeft += scrollAmount * direction;
  }
};
</script>


<template>
  <div class="quiz-row-main">
    <h1>{{ rowName }}</h1>
    <div class="scroll-container" ref="scrollContainer">
      <div class="quizzes">
        <quiz-card-component
          v-for="(quiz, index) in quizMap"
          :key="index"
          :quiz-name="quiz.name"
          :image-url="quiz.url"
        ></quiz-card-component>
      </div>
    </div>
    <button class="prev" @click="scroll(-1)">
      <arrow-left-component></arrow-left-component>
    </button>
    <button class="next" @click="scroll(1)">
      <arrow-right-component></arrow-right-component>
    </button>
  </div>
</template>

<style scoped>
.quiz-row-main {
  position: relative;
  margin: 20px 10px;
}

.scroll-container {
  overflow-x: hidden; /* Hide horizontal scrollbar */
  scroll-behavior: smooth; /* Enable smooth scrolling */
  display: flex;
  width: 100%;
}

.quizzes {
  display: flex;
}

.prev, .next {
  position: absolute;
  top: 50%;
  display: flex;
  align-items: center;
  border: none;
  border-radius: 100%;
  background-color: black;
  opacity: 0.6;
  cursor: pointer;
}

.prev:hover, .next:hover {
  opacity: 1;
}

.prev {
  left: 10px;
}

.next {
  right: 10px;
}
</style>