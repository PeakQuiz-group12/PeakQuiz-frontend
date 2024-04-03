<template>
  <!-- Title of the list-->
  <h3 class="title">{{title}}</h3>

  <div class="divider"></div>

  <div class="quiz-list">

    <!-- Quizzes list -->
    <div v-if="isCompleted">
      <div class="quizzes">
        <div v-for="quiz in quizzesToShow" :key="quiz.id" class="quiz-item">
          <div class="quiz-details">
            <div class="quiz-title-container">
              <h3>{{ quiz.title }}</h3>
            </div>
            <CircularProgress
                :score="quiz.score"
                :max-score="quiz.maxScore"
            ></CircularProgress>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="quizzes">
        <div v-for="quiz in quizzesToShow" :key="quiz.id" class="quiz-item">
          <div class="quiz-details">
            <div class="quiz-title-container">
              <h3>{{ quiz.title }}</h3>
            </div>
            <CircularProgress
                :score="quiz.score"
                :max-score="quiz.maxScore"
            ></CircularProgress>
          </div>
        </div>
      </div>
    </div>

    <!-- Infinite scroll loading for mobile -->
    <div v-if="!isDesktop" class="loading" v-infinite-scroll="loadMoreQuizzes" infinite-scroll-distance="10">
      <span v-if="isLoading">Loading...</span>
    </div>
  </div>
</template>


<script>

import CircularProgress from './CircularProgress.vue';

export default {
  components:{
    CircularProgress
  },
  data() {
    return {
      quizzes: [], // Initialize with mock quizzes
      pageSize: 5,
      currentPage: 0,
      isDesktop: window.innerWidth > 768,
      isLoading: false,
    };
  },
  computed: {
    quizzesToShow() {
      if (this.isDesktop) {
        let start = this.currentPage * this.pageSize;
        return this.quizzes.slice(start, start + this.pageSize);
      } else {
        return this.quizzes;
      }
    },
  },
  methods: {
    loadQuizzes() {
      return new Promise((resolve) => {
        setTimeout(() => {
          let newQuizzes = this.mockFetchQuizzes();
          resolve(newQuizzes);
        }, 1000);
      });
    },
    loadMoreQuizzes() {
      this.isLoading = true;
      this.loadQuizzes().then((newQuizzes) => {
        if (this.isDesktop) {
          this.currentPage++;
        } else {
          this.quizzes.push(...newQuizzes);
        }
        this.isLoading = false;
      });
    },
    mockFetchQuizzes() {
      let moreQuizzes = [];

      for (let i = 0; i < (this.isDesktop ? this.pageSize : 10); i++) {
        moreQuizzes.push({
          id: this.quizzes.length + i,
          title: `Quiz ${this.quizzes.length + i}`,
          score: Math.floor(Math.random() * 10) + 1,
          maxScore: 10,
        });
      }
      return moreQuizzes;
    },
    initialMockQuizzes() {
      // Generates initial mock quizzes for display on component mount
      let initialQuizzes = [];
      for (let i = 0; i < this.pageSize; i++) {
        initialQuizzes.push({
          id: i,
          title: `Initial Quiz ${i + 1}`,
          score: Math.floor(Math.random() * 10) + 1,
          maxScore: 10
        });
      }
      return initialQuizzes;
    },
    handleResize() {
      this.isDesktop = window.innerWidth > 768;
      if (!this.isDesktop) {
        this.pageSize = 10;
      }
    },
  },
  mounted() {
    this.quizzes = this.initialMockQuizzes();
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  props: {
    title: {
      type: String,
      required: true,
    },
    isCompleted: {
      type: Boolean,
      required: true,
    }
  }
};
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
