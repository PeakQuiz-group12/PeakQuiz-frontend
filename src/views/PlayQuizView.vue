<script setup>
import HeaderComponent from '@/components/headerComponent.vue'
import FooterComponent from '@/components/footerComponent.vue'
import { computed, onMounted, ref } from 'vue'
import ArrowRightComponent from '@/components/iconComponents/arrowRightComponent.vue'
import ArrowLeftComponent from '@/components/iconComponents/arrowLeftComponent.vue'
import TimerComponent from '@/components/iconComponents/timerComponent.vue'
import CheckComponent from '@/components/iconComponents/checkComponent.vue'
import CrossComponent from '@/components/iconComponents/crossComponent.vue'
import PieChartComponent from '@/components/pieChartComponent.vue'
import { useQuizStore } from '@/stores/quizStore.js'
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore()

const store = useQuizStore()
const route = useRoute()

const quiz = ref(null);
let totalQuestions = 0
const currentQuestion = ref(1);


const game = {
  gameId: null,
  correctAnswers: 0,
  rating: 5,
  feedback: "",
  playedOn: null,
  username: userStore.username,
  quizId: route.params.quizId
}

onMounted(async () => {
  const quizId = route.params.quizId
  await store.fetchQuiz(quizId)
  quiz.value = store.quiz
  totalQuestions = quiz.value.questions.length;


  quiz.value.questions = shuffle(quiz.value.questions);
  startTimer();
  initializeUserAnswers()

  await userStore.fetchTags()
  tags.value = userStore.tags
})


function initializeUserAnswers() {
  userAnswers.value = quiz.value.questions.map(question => ({
    id: question.id,
    userAnswer: ""  // Initialize with a blank string
  }));
}

const inGame = ref(true)

const userAnswers = ref([])

const updateUserAnswer = (id, answer) => {
  const existingAnswerIndex = userAnswers.value.findIndex(ans => ans.id === id);
  userAnswers.value[existingAnswerIndex].userAnswer = answer;
};

const getUserAnswer = (id) => {
  const answerObject = userAnswers.value.find(ans => ans.id === id);
  return answerObject ? answerObject.userAnswer : null;
};

const getColorForAnswerOption = (index) => {
  const colors = ['#8d008d', '#FF0000', '#ffb636', '#4545ff'];
  return colors[index % colors.length];
};

const questionRange = computed(() => {
  let start, end;
  const buffer = Math.min(2, Math.floor(totalQuestions / 2)); // Calculate buffer to show around the current question
  if (totalQuestions <= 5) {
    // If total questions are 5 or fewer, show all questions
    start = 1;
    end = totalQuestions;
  } else if (currentQuestion.value <= 3) {
    // Adjust start and end to ensure at least 5 questions are shown when possible
    start = 1;
    end = 5;
  } else if (currentQuestion.value > totalQuestions - 3) {
    start = totalQuestions - 4;
    end = totalQuestions;
  } else {
    start = currentQuestion.value - buffer;
    end = currentQuestion.value + buffer;
  }
  return Array.from({ length: (end - start + 1) }, (_, i) => start + i);
});


const selectQuestion = (question) => {
  if (question < 1 || question > totalQuestions) return;
  currentQuestion.value = question;
};

const timer = ref(0); // Timer starts at 0 seconds
let timerInterval = null;

// Function to start the timer
const startTimer = () => {
  timerInterval = setInterval(() => {
    timer.value++;
  }, 1000);
};

// Function to stop the timer
const stopTimer = () => {
  clearInterval(timerInterval);
};

// Function to format the timer value into mm:ss format
const formattedTimer = computed(() => {
  const minutes = Math.floor(timer.value / 60);
  const seconds = timer.value % 60;
  return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
});

const finishGame = async () => {
  stopTimer()
  checkAnswersLowerCase()
  inGame.value = false;

  game.correctAnswers = correctAnswersCount.value
  await userStore.createGame(game)
}

const checkAnswersLowerCase = () => {
  for (const question of quiz.value.questions) {
    const userAnswer = getUserAnswer(question.id);
    if (userAnswer) {
      const userAnswerLowerCase = userAnswer.toLowerCase();
      const correctAnswer = question.answers.find(answer => answer.isAnswer).answer;

      if (userAnswerLowerCase === correctAnswer.toLowerCase()) {
        updateUserAnswer(question.id, correctAnswer);
      }
    }
  }
}


const handleNextButtonClick = () => {
  if (currentQuestion.value === totalQuestions) {
    finishGame();
  } else {
    selectQuestion(currentQuestion.value + 1);
  }
};

const correctAnswersCount = computed(() => {
  return userAnswers.value.filter((userAnswer) => {
    const question = quiz.value.questions.find(q => q.id === userAnswer.id);
    return question && findCorrectAnswer(question.answers) === userAnswer.userAnswer;
  }).length;
});

const incorrectAnswersCount = computed(() => {
  return totalQuestions - correctAnswersCount.value;
});

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]]; // Swap
  }
  return array;
}

const currentQuestionOptions = computed(() => {
  const current = quiz.value.questions[currentQuestion.value - 1];
  return shuffle(current.answers);
});

function findCorrectAnswer(answers) {
  for (const element of answers) {
    if (element.isAnswer) {
      return element.answer;
    }
  }
  return null; // Return null if no correct answer is found
}

const tags = ref([])
const tag = ref("")

const updateTags = () => {
  const tagToAdd = {
    id: null,
    title: tag.value,
    username: userStore.username,
    questions: []
  };

  let found = false;  // Flag to track if a matching tag is found

  for (const tagF of tags.value) {
    if (tagF.title === tag.value) {
      found = true;

      tagF.questions.push(quiz.value.questions[currentQuestion.value - 1])
      console.log(tagF)
      userStore.updateTag(tagF);
      break;  // Stop once you find and update the tag
    }
  }

  if (!found) {
    // If no matching tag is found, create a new tag
    tagToAdd.questions.push(quiz.value.questions[currentQuestion.value - 1]);
    userStore.createTag(tagToAdd);
  }
};
</script>

<template>
  <div class="main">
    <header-component></header-component>
    <div v-if="quiz && quiz.questions && quiz.questions.length > 0" class="playQuiz-main">
      <div class="timer-and-options">
        <p class="timer">
          <timer-component></timer-component>{{ formattedTimer }}
        </p>
        <div>
          <input class="tag-input" v-model="tag" placeholder="Tag for question">
          <button class="add-tag-btn" @click="updateTags">Add tag</button>
        </div>
        <button class="give-up-btn" @click="finishGame">Give up</button>
      </div>
      <div class="summary" v-if="!inGame">
        <h1>{{ quiz.quizTitle }}</h1>
        <div class="summary-box">
          <h1>Summary</h1>
          <div class="chart-and-stats">
            <pie-chart-component :correct="correctAnswersCount" :incorrect="incorrectAnswersCount"></pie-chart-component>
            <div>
              <h1>{{ correctAnswersCount }} correct</h1>
              <h1>{{ incorrectAnswersCount }} incorrect</h1>
            </div>
          </div>
          <div class="question-summary-card" v-for="(question, index) in quiz.questions" :key="index">
            <div class="question-text-div-summary">
              <h2>{{ question.text }}</h2>
              <div class="answers-summary">
                <p v-if="getUserAnswer(question.id)">Your answer: {{ getUserAnswer(question.id) }}</p>
                <p v-else>You did not answer</p>
                <p>Correct answer: {{ findCorrectAnswer(question.answers) }}</p>
              </div>
            </div>
            <div v-if="getUserAnswer(question.id) === findCorrectAnswer(question.answers)" class="right-answers-symbol">
              <check-component></check-component>
            </div>
            <div v-else class="wrong-answer-symbol">
              <cross-component></cross-component>
            </div>
          </div>
        </div>
      </div>
      <div v-if="inGame" class="questions-and-row">
        <h1>{{ quiz.quizTitle }}</h1>
        <div class="question-box">
          <img class="question-img" :src="quiz.questions[currentQuestion - 1].media" alt="question image">
          <h1>{{ quiz.questions[currentQuestion - 1].text }}</h1>
          <div class="answer-options">
            <input v-if="currentQuestionOptions.length === 1" v-model="userAnswers[currentQuestion - 1].userAnswer" class="answer-input" placeholder="Your answer">
            <button v-else v-for="(answerOption, index) in currentQuestionOptions"
                    :key="index"
                    :style="{ backgroundColor: getColorForAnswerOption(index) }"
                    class="answer-options-btn"
                    :class="{'selected-answer': answerOption.answer === getUserAnswer(quiz.questions[currentQuestion - 1].id)}"
                    @click="updateUserAnswer(quiz.questions[currentQuestion - 1].id, answerOption.answer)">
              {{ answerOption.answer }}
            </button>
          </div>
        </div>
        <div class="questionRow">
          <button class="prev-btn" @click="selectQuestion(currentQuestion - 1)" :disabled="currentQuestion === 1">
            <arrow-left-component></arrow-left-component> Prev
          </button>
          <button
            v-for="question in questionRange"
            :key="question"
            @click="selectQuestion(question)"
            class="num-btn"
            :class="{'selected': question === currentQuestion, 'answered': getUserAnswer(quiz.questions[question - 1].id)}"
          >
            {{ question }}
          </button>
          <button class="next-btn"
                  @click="handleNextButtonClick">
            {{ currentQuestion === totalQuestions ? 'Finish' : 'Next' }}<arrow-right-component></arrow-right-component>
          </button>
        </div>
      </div>
    </div>
    <footer-component></footer-component>
  </div>
</template>

<style scoped>
.main {
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
}

.playQuiz-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.timer-and-options {
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 10px;
  border-bottom: solid 2px black;
}

.timer {
  font-size: 25px;
  display: flex;
  align-items: center;
}

.timer-and-options button {
  width: 100px;
  height: 50px;
  color: white;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  cursor: pointer;
}

.add-tag-btn {
  margin-left: 5px;
  background-color: green;
}

.give-up-btn {
  background-color: #d20606;
}

.summary {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.chart-and-stats {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  padding: 10px;
}

.question-summary-card {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  padding: 5px;
  margin: 5px 0;
  border-radius: 5px;
}

.question-text-div-summary {
  width: 85%;
}

.wrong-answer-symbol, .right-answers-symbol {
  height: 50px;
  width: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 100%;
}

.wrong-answer-symbol {
  background-color: red;
}

.right-answers-symbol {
  background-color: green;
}

.questions-and-row {
  max-width: 700px;
  min-width: 500px;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  text-align: center;
}

@media (max-width: 767px) {
  .questions-and-row {
    width: 80%;
    max-width: 700px;
    min-width: 300px;
  }
}

.question-box, .summary-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #C7EEFF;
  margin-bottom: 20px;
  padding: 10px;
  border-radius: 5px;
  border: solid 2px black;
}

.summary-box {
  text-align: left;
  max-width: 700px;
  min-width: 500px;
}

@media (max-width: 767px) {
  .summary-box {
    width: 80%;
    max-width: 700px;
    min-width: 300px;
  }
}

.answers-summary {
  display: flex;
}

.answers-summary p:first-child {
  margin-right: 20px;
}

h1 {
  margin: 10px 0;
}

.question-img {
  height: 70%;
  max-height: 200px;
  border-radius: 5px;
}
.answer-options {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.answer-options-btn {
  height: 50px;
  font-size: 20px;
  color: white;
  border-radius: 5px;
  border: solid 2px black;
  cursor: pointer;
  flex-basis: calc(50% - 10px);
  margin: 5px;
}

.selected-answer {
  border: solid 5px black;
  transform: scale(1.05);
}

.questionRow {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

.prev-btn, .next-btn {
  width: 22%;
  height: 50px;
  display: flex;
  align-items: center;
  color: white;
  font-size: 20px;
  background-color: #0077C0;
  border-radius: 5px;
  border: solid 2px black;
  cursor: pointer;
}

.prev-btn {
  justify-content: left;
}

.next-btn {
  justify-content: right;
}

.num-btn {
  width: 10%;
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  cursor: pointer;
}

.selected {
  border: solid 2px black;
}

.answered {
  background-color: #6e6e6e;
}

.answer-input {
  width: 80%;
  height: 50px;
  font-size: 20px;
  margin-bottom: 30px;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  background-color: #f0f0f0;
  padding-left: 10px;
}

.tag-input {
  width: 60%;
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  background-color: #f0f0f0;
  padding-left: 10px;
}
</style>