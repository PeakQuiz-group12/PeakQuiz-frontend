<template>
  <!-- Title of the list-->
  <h3 class="title">Completed</h3>
  <div class="divider"></div>
  <div class="quiz-list">
    <!-- Quizzes list -->
    <div v-if="games.length > 0">
      <div class="quizzes">
        <div v-for="game in props.games" :key="game.id" class="quiz-item" @click="navigateToQuiz(game.quizId)">
          <div class="quiz-details">
            <div class="quiz-title-container">
              <h3>{{ findQuizTitle(game.quizId) }}</h3>
            </div>
            <CircularProgress :score="game.correctAnswers" :max-score=10></CircularProgress>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <h1>No quizzed found :(</h1>
    </div>

    <!-- Infinite scroll loading for mobile -->
    <div v-if="!isDesktop" class="loading" v-infinite-scroll="loadMoreQuizzes" infinite-scroll-distance="10">
      <span v-if="isLoading">Loading...</span>
    </div>
  </div>
</template>


<script setup>
import { ref, computed, onMounted } from 'vue';
import CircularProgress from './CircularProgress.vue';

const props = defineProps({
  games: {
    type: Array,
    default: () => []
  },
  quizzes: {
    type: Array,
    default: () => []
  },
});

console.log(props.games)


const pageSize = ref(window.innerWidth > 768 ? 5 : 10);

// Computed properties
const paginatedGames = computed(() => {
  let startIndex = 0; // Change as per your pagination logic
  return props.quizzes.slice(startIndex, startIndex + pageSize.value);
});

const findQuizTitle = (quizId) => {
  const quiz = props.quizzes.find((quiz) => quiz.id === quizId);
  return quiz ? quiz.title : '';
};



const navigateToQuiz = (quizId) => {
  router.push({ name: 'QuizView', params: { id: quizId } });
};

onMounted(() => {
  // Handle window resize for responsive design
  const handleResize = () => {
    pageSize.value = window.innerWidth > 768 ? 5 : 10;
  };
  window.addEventListener('resize', handleResize);
  handleResize();

  // Fetch data logic if needed
});

</script>

<style scoped>
.title {
  font-size: 20px;
  margin-bottom: 20px;
}
.divider {
  margin: 0;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 7px;
  width: 100%;
  background-color: #0077C0;
}
.quiz-list {
  align-items: center;
  overflow-x: auto;
}
.quiz-title-container{
  font-size: 1em; /* Adjust the font size to fit in the container */
  word-break: break-word; /* Break the word to prevent overflow */
}
.quizzes {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

.quiz-item {
  display: flex;
  flex-direction: column;
  padding: 1rem; /* Padding to ensure content does not touch the borders */
  box-sizing: border-box; /* Include padding in width calculations */
  flex: 0 0 auto;
  width: 300px;
  margin: 0.5rem;
  background: white;
  border: 8px solid #007bff;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Assuming .quiz-details is the parent container */
.quiz-details {
  display: flex;
  flex-direction: column;
  justify-content: center;
}


.pagination-controls button {
  padding: 0.5rem 1rem;
  background-color: #007bff;
  border: none;
  border-radius: 5px;
  color: white;
  cursor: pointer;
}

@media (max-width: 768px) {
  .quiz-list {
    overflow-x: hidden;
  }
  .quiz-item {
    width: 100%;
    max-width: 300px;
    margin: 1rem;
    border-radius: 10px;
    padding-top: 30%;
    position: relative;
  }
  .quiz-details, .quiz-title-container {
    position: absolute;
    top: 0;
    left: 0.5rem;
    right: 0;
    bottom: 0;
    /* Ensures content fits within the parent container */
  }

  .quiz-title-container h3 {
    font-size: 0.9em; /* Adjust font size as necessary */
    white-space: normal; /* Make sure text wraps */
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2; /* Limit text to two lines */
    -webkit-box-orient: vertical;
  }
}
</style>