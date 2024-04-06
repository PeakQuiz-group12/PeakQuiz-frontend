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

const quiz = ref({ quizTitle: "Easy Math Quiz",
  questions: [
    { questionID: 5231, questionImage: "/src/assets/test-quiz-image1.webp", question: "Is the earth flat?", answerOptions: { option1: "true", correctAnswer: "false" }},
    { questionID: 1242, questionImage: "/src/assets/test-quiz-image2.webp", question: "What was the name of the first man on the moon?", answerOptions: { option1: "Buzz Aldrin", option2: "Buzz Lightyear", option3: "Lance Armstrong", correctAnswer: "Niel Armstrong" }},
    { questionID: 5743, questionImage: "/src/assets/test-quiz-image1.webp", question: "What is car in norwegian", answerOptions: { correctAnswer: "bil" }},
    { questionID: 4236, questionImage: "/src/assets/test-quiz-image2.webp", question: "What is the name of agent 007", answerOptions: { correctAnswer: "James Bond" }},
    { questionID: 9643, questionImage: "/src/assets/test-quiz-image1.webp", question: "Hei", answerOptions: { correctAnswer: "hei" }},
    { questionID: 1286, questionImage: "/src/assets/test-quiz-image2.webp", question: "What is 80 - 125", answerOptions: { option1: "0", option2: "-60", option3: "30", correctAnswer: "-45" }},
    { questionID: 3896, questionImage: "/src/assets/test-quiz-image1.webp", question: "What is 4 / (2 + 2)", answerOptions: { option1: "6", option2: "4", option3: "0", correctAnswer: "1" }},
]})

function initializeUserAnswers() {
  userAnswers.value = quiz.value.questions.map(question => ({
    questionID: question.questionID,
    userAnswer: ""  // Initialize with a blank string
  }));
}

onMounted(() => {
  quiz.value.questions = shuffle(quiz.value.questions);
  startTimer();
  initializeUserAnswers()
});

const inGame = ref(true)

const userAnswers = ref([])

const updateUserAnswer = (questionID, answer) => {
  const existingAnswerIndex = userAnswers.value.findIndex(ans => ans.questionID === questionID);
  userAnswers.value[existingAnswerIndex].userAnswer = answer;
};

const getUserAnswer = (questionID) => {
  const answerObject = userAnswers.value.find(ans => ans.questionID === questionID);
  return answerObject ? answerObject.userAnswer : null;
};

const getColorForAnswerOption = (index) => {
  const colors = ['#8d008d', '#FF0000', '#ffb636', '#4545ff'];
  return colors[index % colors.length];
};

const totalQuestions = quiz.value.questions.length;
const currentQuestion = ref(1);

const questionRange = computed(() => {
  let start, end;
  if (currentQuestion.value <= 3) {
    start = 1;
    end = 5;
  } else if (currentQuestion.value > totalQuestions - 3) {
    start = totalQuestions - 4;
    end = totalQuestions;
  } else {
    start = currentQuestion.value - 2;
    end = currentQuestion.value + 2;
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

const finishGame = () => {
  stopTimer()
  checkAnswersLowerCase()
  inGame.value = false;
}

const checkAnswersLowerCase = () => {
  for (const question of quiz.value.questions) {
    if (getUserAnswer(question.questionID).toLowerCase() === question.answerOptions.correctAnswer.toLowerCase()) {
      updateUserAnswer(question.questionID, question.answerOptions.correctAnswer)
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
    const question = quiz.value.questions.find(q => q.questionID === userAnswer.questionID);
    return question && question.answerOptions.correctAnswer === userAnswer.userAnswer;
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
  let options = [...Object.values(current.answerOptions).slice(0, -1), current.answerOptions.correctAnswer];
  return shuffle(options);
});

onMounted(() => {
  startTimer();
});
</script>

<template>
  <header-component></header-component>
  <div class="playQuiz-main">
    <div class="timer-and-options">
      <p class="timer">
        <timer-component></timer-component>{{ formattedTimer }}
      </p>
      <button @click="finishGame">Give up</button>
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
            <h2>{{ question.question }}</h2>
            <div class="answers-summary">
              <p v-if="getUserAnswer(question.questionID)">Your answer: {{ getUserAnswer(question.questionID) }}</p>
              <p v-else>You did not answer</p>
              <p>Correct answer: {{ question.answerOptions.correctAnswer }}</p>
            </div>
          </div>
          <div v-if="getUserAnswer(question.questionID) === question.answerOptions.correctAnswer" class="right-answers-symbol">
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
        <img class="question-img" :src="quiz.questions[currentQuestion - 1].questionImage" alt="question image">
        <h1>{{ quiz.questions[currentQuestion - 1].question }}</h1>
        <div class="answer-options">
          <input v-if="currentQuestionOptions.length === 1" v-model="userAnswers[currentQuestion - 1].userAnswer" class="answer-input" placeholder="Your answer">
          <button v-else v-for="(answerOption, index) in currentQuestionOptions"
                  :key="index"
                  :style="{ backgroundColor: getColorForAnswerOption(index) }"
                  class="answer-options-btn"
                  :class="{'selected-answer': answerOption === getUserAnswer(quiz.questions[currentQuestion - 1].questionID)}"
                  @click="updateUserAnswer(quiz.questions[currentQuestion - 1].questionID, answerOption)">
            {{ answerOption }}
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
          :class="{'selected': question === currentQuestion, 'answered': getUserAnswer(quiz.questions[question - 1].questionID)}"
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
</template>

<style scoped>
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
  background-color: #d20606;
  border-radius: 5px;
  border: solid 2px black;
  cursor: pointer;
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
</style>