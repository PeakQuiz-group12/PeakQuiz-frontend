<template>
  <div class="quiz-editor">
    <!-- Question list -->
    <div class="question-list">

      <div class="questions">
        <div v-for="question in quiz.questions" :key="question.id" class="question-item" @click="selectQuestion(question)">
          {{ question.text }}
        </div>
      </div>


      <div class ="add-question">
        <button class="add-button" @click="addQuestion">Add Question</button>
      </div>
    </div>
    <div class ="editor-options-container">
      <!-- question editor -->
      <div class="question-editor">
        <p>Question text</p>
        <input
            class="questionText"
            type="text"
            placeholder="Enter question text"
            v-model="currentQuestion.text"
        />
        <p class="question-image-url-p">Question image url</p>
        <input
          class="questionText"
          type="text"
          placeholder="Enter question image url"
          v-model="currentQuestion.media"
        />

        <div v-if="currentQuestion && currentQuestion.answers" class="answer-container">
          <div class="answer-item" v-for="(editableAnswer, index) in currentQuestion.answers" :key="index"
               :style="{ backgroundColor: colors[index] }">
            <!-- Content for the Quiz option -->
            <div v-if="currentQuestion.questionType === 'MULTIPLE_CHOICE'" class="content">
              <textarea :value="editableAnswer.answer" placeholder="Enter answer option" @input="event => updateOption(event, index)" />
              <div class="checkbox-container">
                <input type="checkbox" :checked="editableAnswer.isAnswer" @change="event => updateOption(event, index)" />
              </div>
            </div>
            <!-- Content for the True or False option -->
            <div v-else-if="currentQuestion.questionType=== 'True or False'" class="content">
              <p>{{ editableAnswer.answer }}</p>
              <input type="checkbox" :checked="editableAnswer.isAnswer" @change="event => updateOption(event, index)" />
            </div>
            <!-- Content for the Input option -->
            <div v-else-if="currentQuestion.questionType==='FILL_IN_BLANK'" class="content">
              <input
                  type="text"
                  class="input-answer"
                  :value="editableAnswer.answer"
                  placeholder="Enter correct answer"
                  @input="event => updateOption(event, index)"
              />
            </div>
            <button v-if="currentQuestion.answers>2" class="remove-button-answer-option" @click="removeAnswer">
              X
            </button>
          </div>
        </div>

        <button
            v-if="currentQuestion.questionType === 'MULTIPLE_CHOICE' && currentQuestion.answers.length < 4"
            @click="addAnswer"
        >
          Add Option
        </button>
      </div>

      <!--Options for question -->
      <div class ="options">
        <div>
          <div class = "question-type">
            <h2>Question Type</h2>
            <select class ="option-item" v-model="currentQuestion.questionType" @change="changeOption">
              <option>MULTIPLE_CHOICE</option>
              <option>FILL_IN_BLANK</option>
            </select>
          </div>

          <div>
            <h2>Select Difficulty</h2>
            <form class="difficulty-rating">
              <label v-for="(color, index) in difficultyColors" :key="index">
                <input type="radio" name="difficulty"
                       :value="index + 1"
                       v-model="currentQuestion.difficulty"
                       @change="changeDifficulty">
                <span class="difficulty-scale" :style="{ backgroundColor: color }">{{ index + 1 }}</span>
              </label>
            </form>
          </div>
        </div>
        <div class="save-quiz">
          <div class = "under-line"></div>
          <button @click="createFullQuiz" class="save-quiz-btn">Save Quiz</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, onMounted, ref } from 'vue'
import { useAuth } from '@/useAuth.js'
import { useUserStore } from '@/stores/userStore.js'

const userStore = useUserStore();

const { refreshTokenIfNeeded } = useAuth();


const props = defineProps({
  quizFromParent: {
    type: Object,
    required: true
  }
});

const quizFromBackend = ref()

const userDTO = ref()

onMounted(async () => {
  await userStore.fetchMe()
  userDTO.value = userStore.userDTO
  //JSON.parse(JSON.stringify(userDTO.value))
})

const quiz = props.quizFromParent

const currentQuestion = ref(null);
if(!quiz.questions.length)
{
  const defaultQuestion = {
    text: '',
    questionType: 'MULTIPLE_CHOICE',
    media: null,
    difficulty: 3,
    explanation: 'This is a test explanation',
    answers: [
      { answer: '', isAnswer: false },
      { answer: '', isAnswer: false },
      { answer: '', isAnswer: false },
      { answer: '', isAnswer: false },
    ],
    quizId: quiz.id
  };
  quiz.questions.push(defaultQuestion);
  currentQuestion.value = defaultQuestion;
}else{
  currentQuestion.value = quiz.questions[0];
}
const colors = ['#8D008D', '#FF0000', '#ffb636', '#4545ff'];
const difficultyColors = ['green', 'blue', 'orange', 'red', 'purple'];

const selectQuestion = (question) => {
  currentQuestion.value = question;
};

const addQuestion = () => {
  const newQuestion = {
    text: '',
    questionType: 'MULTIPLE_CHOICE',
    media: null,
    difficulty: 3,
    explanation: 'This is a test explanation',
    answers: [
      { answer: '', isAnswer: false },
      { answer: '', isAnswer: false },
      { answer: '', isAnswer: false },
      { answer: '', isAnswer: false },
    ],
    quizId: quiz.id
  };
  quiz.questions = [...quiz.questions, newQuestion];
  currentQuestion.value = newQuestion;
};



const createFullQuiz = async () => {
  console.log(JSON.stringify(quiz))
  const token = await refreshTokenIfNeeded();
  try {
    const response = await fetch('http://localhost:8080/quizzes/' + quiz.id, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(quiz),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("successful", result);
      quizFromBackend.value = result
    } else {
      console.error(response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }

  const collabData = {
    userId: userDTO.value.id,
    quizId: quizFromBackend.value.id,
    collaboratorType: "CREATOR"
  }
  await userStore.postCollab(collabData)
};

const removeAnswer = (index) => {
  currentQuestion.value.answers.splice(index, 1);
};

const addAnswer = () => {
  currentQuestion.value.answers.push({ answer: '', isAnswer: false });
};

const isImageFile = (fileType) => {
  return fileType.includes('image');
};
const isVideoFile = (fileType) => {
  return fileType.includes('video');
};
const changeOption = (event) => {
  const newQuestionType = event.target.value;
  currentQuestion.value.questionType = newQuestionType;

  switch (newQuestionType) {
    case 'MULTIPLE_CHOICE':
      currentQuestion.value.answers = [
        { answer: '', isAnswer: false },
        { answer: '', isAnswer: false },
        { answer: '', isAnswer: false },
        { answer: '', isAnswer: false },
      ];
      break;
    case 'True or False':
      currentQuestion.value.answers = [
        { answer: 'True', isAnswer: true },
        { answer: 'False', isAnswer: false },
      ];
      break;
    case 'FILL_IN_BLANK':
      currentQuestion.value.answers = [{ answer: '', isAnswer: true }];
      break;
    default:
      break;
  }
};

const updateOption = (event, index) => {
  // Determine the field being updated (text or isAnswer)
  const updatedField = event.target.type === 'checkbox' ? 'isAnswer' : 'answer';

  // Update the current question's answers
  if (updatedField === 'answer') {
    currentQuestion.value.answers[index].answer = event.target.value;
  } else if (updatedField === 'isAnswer') {
    currentQuestion.value.answers[index].isAnswer = event.target.checked;
  }
};

const changeDifficulty = (event) => {
  currentQuestion.value.difficulty = event.target.value;
};
const resetFileInput = () => {
  currentQuestion.value.media = null;
};
const handleFileUpload = (event) => {
  const file = event.target.files[0];
  const fileUrl = URL.createObjectURL(file);
  currentQuestion.value.media = {
    url: fileUrl,
    type: file.type,
  };
};



</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.quiz-editor {
  max-height: 700px;
  height: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

/* Question list */
.question-list {
  display: flex;
  max-height: 600px;
  height: 100%;
  flex-direction: column;
  width: 100%;
  flex: 2;
  overflow-y: auto;
  overflow-x: hidden;
}
.questions
{
  width: 85%;
  display: flex;
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
}
.question-item {
  box-sizing: border-box;
  width: 100%;
  min-height: 100px;
  overflow: hidden;
  max-height: 200px; /* Adjust based on your requirement */
  margin-bottom: 0.5rem;
  background-color: #2c3e50;
  color: white;
  border: 4px solid orange;
  word-wrap: break-word; /* This ensures long words do not overflow */
}

.add-question {
  margin-top: auto;
  margin-bottom: 20px;
  margin-left: 10px;
  width: 80%;
  max-width: 200px;
  min-width: 50px;

  display: flex;
}

.add-button {
  flex: 1; /* This ensures both buttons take equal space */
  padding: 10px;
  border-radius: 4px;
  cursor: pointer;
  height: 40px;
  background-color: #2c3e50; /* Background for add button */
  color: white;
  border: none; /* Optional: for styling */
}
.editor-options-container {
  display: flex;
  flex: 6;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: lightslategray;
}


.questionText {
  width: 100%;
  height: 50px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}
.uploaded-file-display {
  margin: 10px 0;
}
.uploaded-file-display img, .uploaded-file-display video {
  width: 100%;
  height: auto;
}
.remove-file-button {
  height: 40px;
  width: 50%;
  padding: 10px;
  background-color: #0077C0;
  color: white;
  border: none;
  cursor: pointer;
}

.upload-text {
  color: #555;
  font-size: 20px;
  font-weight: bold;
}
.answer-container {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-auto-rows: minmax(100px, auto);
  gap: 20px;
  justify-items: center;
  align-items: start;

}
.answer-item {
  width: 90%;
  height: 70px;
  display: flex;
  padding: 5px;
  border-radius: 5px;
  cursor: pointer;
}
textarea{
  width: 100%;
  max-width: 300px;
  height: 100%;
  max-height: 70px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}
.checkbox-container {
  display: flex;
  align-items: center;
}
.input-answer {
  width: 100%;
  height: 50px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}

.answer-options {
  margin-top: 20px;
}
.option-item {
  width: 100%;
  height: 50px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
}
/*Question Editor*/
.question-editor {
  flex-direction: column;
  display: flex;
  flex:6;
  justify-content: center;
  align-items: center;
  padding: 20px;
  border: 1px solid #ccc;
  margin-right: 5rem;
  border-radius: 5px;
  background-color: lightslategray;
}
.questionText {
  flex-shrink: 0; /* Prevents the input from shrinking */
  width: 80%; /* Full width of the parent container */
  max-width: 600px; /* Maximum width of the input field */
  height: 50px;
  margin: auto 80px auto 80px;/* Center the input horizontally and add margin */
  border-radius: 5px;
  border: solid 2px black;
  padding-left: 10px; /* Add padding inside the input for text */
  box-sizing: border-box;
  background-color: #f0f0f0;
}

.answer-container {
  flex-shrink: 0;
  width: 100%;
  max-width: 600px;
  min-width: 200px;
  height: 50%;
  max-height: 150px;
  min-height: 20px;
  padding: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr); /* Two columns, each taking half of the container width */
  grid-auto-rows: minmax(100px, auto); /* Minimum row height, but can grow if content is larger */
  gap: 0; /* Space between grid items */
  justify-items: center; /* Center grid items horizontally */
  align-items: start; /* Align grid items to the start of the grid area vertically */
}


/*FileUploader component*/
.upload-file-container {
  flex-shrink: 0;
  height: 100%;
  max-height: 200px;
  min-height: 100px;
  border: 6px solid #0077C0;
  border-radius: 5px;
  background: white;
  width: 100%;
  max-width: 200px;
  min-width: 100px;
  padding: 20px;
  text-align: center;
  cursor: pointer;
}

.file-upload-label {
  display: block;
}
.upload-icon-border {
  margin: 20px auto 20px auto;
  background-color: #2c3e50;
  width: 50px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.upload-icon {
  color: white;
  font-size: 36px; /* Adjust size as needed */
}

.upload-text {
  color: #555;
  font-size: 20px;
  font-weight: bold;
}

/* Hide the actual file input */
#file-upload {
  display: none;
}
.uploaded-file-display {
  width: 100%;  /* Set to desired width of the container */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Center the media horizontally */
  align-items: center;     /* Center the media vertically */
  overflow: hidden;        /* Clip excess media */
  margin-top: 20px;        /* Spacing from the top */
  margin-bottom: 0.5rem;   /* Spacing from the bottom */
}

.uploaded-file-display img,
.uploaded-file-display video {
  max-width: 100%;    /* Max width but not stretching */
  max-height: 300px;  /* Max height set as needed */
  height: 100%;
  min-height: 100px;
  object-fit: contain; /* Ensures media is scaled properly */
}



/*Answer Item*/
.answer-item input[type="checkbox"] {
  margin-left: 10px;
}
.input-wrapper {
  display: flex;
  flex-direction: row;
  align-items: center;
  background: white;
  border: 1px solid #ddd;
  border-radius: 5px;
  padding: 0.5rem;
}



.input-wrapper textarea {
  /* Styles to match the input */
  width: 100%; /* Take the full width */
  padding: 10px;
  margin-right: 0.5rem; /* Space between textarea and checkbox */
  border: 1px solid #ddd;
  border-radius: 5px;
  overflow: auto; /* Allow scrolling */
  resize: vertical; /* Allow vertical resizing, disable horizontal resizing */
  min-height: 38px; /* Minimum height to match the input height */
}

.input-wrapper .checkbox-container {
  /* Adjustments to checkbox container, if needed */
  flex-shrink: 0; /* Prevent the checkbox container from shrinking */
}

.input-wrapper {
  margin-left: 0.5rem;
}

/* Custom checkbox styles */
.checkbox-container input[type="checkbox"] {
  accent-color: purple; /* Color for the checkbox */
}
.remove-button-answer-option {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  padding: 10px;
  width: 25px;
  height: 25px;
  color: red;
  border: none;
  cursor: pointer;
}


.content {
  display: flex;
  align-items: center;
  flex-grow: 1;
}


/* Additional styling for checkbox and label */
.checkbox-container {
  display: flex;
  align-items: center;
}

.checkbox-container input[type="checkbox"] {
  margin-right: 5px;
  accent-color: purple; /* Color for the checkbox */
}

/* Options style */
.options {
  justify-self: flex-start;
  height: inherit;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  flex: 3;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: lightslategray;
}

/*Difficulty rating*/
.difficulty-rating {
  display: flex;
  flex-direction: row;
  width: 100%;
  max-width: 200px;
  align-items: center;
  justify-content: space-between;
  margin: 0;
  padding: 0;
}

.difficulty-rating label {
  display: block;
  margin-bottom: 5px;
  cursor: pointer;
}

.difficulty-scale {
  padding: 5px;
  border-radius: 5px;
  color: white;
}

input[type="radio"] {
  display: none;
}

input[type="radio"]:checked + .difficulty-scale {
  border: 2px solid black;
}

/* Save Quiz button */
.save-quiz {
  align-items: center;
  justify-self: flex-end;
  justify-content: center;
  width: 100%;
  display: flex;
  flex-direction: column;
}
.save-quiz-btn {
  width: 100%;
  height: 40px;
  background-color: #2c3e50;
  color: white;
  border: none;
  margin: auto;
  border-radius: 4px;
  cursor: pointer;
}
.save-quiz-btn:hover {
  background-color: #0056b3;
}
.under-line {
  width: 100%;
  background-color: #0077C0;
  height: 5px;
  margin: 20px;
}

@media (max-width: 768px) {
  /* Adjust the layout for smaller screens */
  .quiz-editor {
    display: flex;
    flex-direction: column;
    height: 800px; /* Adjust overall height here */
  }

  .question-list {

    flex: 1; /* Takes up 1/4 of the parent height */
    width: 100%; /* Full width */
    overflow-y: hidden; /* Disable vertical scrolling */
    overflow-x: auto; /* Enable horizontal scrolling */
  }
  .questions{
    overflow-y: hidden; /* Disable vertical scrolling */
    overflow-x: auto; /* Enable horizontal scrolling */
    box-sizing: border-box;
    display: flex;
    max-height: 200px;
    height: 100%;
    flex-direction: row; /* Change flex direction for horizontal layout */
    width: 100%;
  }
  .question-item {
    width: 100%; /* Ensure each question takes full width of the container */
    max-width: 200px;
    min-width: 100px;
    min-height: 100px;
    height: 100%;
    max-height: 200px;
    margin-right: 0.5rem; /* Space between questions */
    margin-bottom: 0.5rem;
  }
  .add-button {
    width: 100px; /* Adjust button width */

  }
  .add-question {
    margin: 0 auto; /* Center the button */
  }
  /* Container for both question editor and options */
  .editor-options-container {
    display: flex;
    flex: 3; /* Takes up 3/4 of the parent height */
  }

  .question-editor {
    flex: 2; /* 2/3 of the width */
  }

  .options {
    flex: 1; /* 1/3 of the width */
  }
}
.question-image-url-p {
  margin-top: 5px;
}
</style>
