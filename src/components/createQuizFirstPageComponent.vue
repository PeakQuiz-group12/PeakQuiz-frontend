<script setup>
import HeaderComponent from '@/components/headerComponent.vue'
import FooterComponent from '@/components/footerComponent.vue'
import { ref } from 'vue'
import ArrowRightComponent from '@/components/iconComponents/arrowRightComponent.vue'
import ArrowDownComponent from '@/components/iconComponents/arrowDownComponent.vue'

const emit = defineEmits(['submitBtnClicked'])

const isOpen = ref(false);
const options = ref(["Math", "History", "Music"]);

const title = ref("")
const selectedOptions = ref([]);
const description = ref("")
const imageUrl = ref("https://upload.wikimedia.org/wikipedia/commons/thumb/d/de/Closeup_of_pixels.JPG/220px-Closeup_of_pixels.jpg")


const showTitleErr = ref(false)
const showDescriptionErr = ref(false)
const showImageErr = ref(false)

function toggleDropdown() {
  isOpen.value = !isOpen.value;
}

function handleSubmit() {
  if (title.value.length < 5) {
    showTitleErr.value = true
    return
  }
  else {
    showTitleErr.value = false
  }

  if (description.value.length < 10) {
    showDescriptionErr.value = true
    return
  }
  else {
    showDescriptionErr.value = false
  }
  if (!((imageUrl.value.startsWith('http://') || imageUrl.value.startsWith('https://')) && (imageUrl.value.endsWith('jpg') || imageUrl.value.endsWith('jpeg') || imageUrl.value.endsWith('png') || imageUrl.value.endsWith('gif')))) {
    showImageErr.value = true
    return
  }
  else {
    showImageErr.value = false
  }

  emit('submitBtnClicked', { title: title.value, categories: selectedOptions.value, description: description.value, imageUrl: imageUrl.value});
}
</script>

<template>
  <header-component></header-component>
  <div class="createQuiz-main">
    <div class="content">
      <div class="h1-title">
        <h1>Create New Quiz</h1>
      </div>
      <div class="quiz-details">
        <div class="title">
          <p>Quiz Title</p>
          <input v-model="title" class="text-input" placeholder="Quiz title">
          <p v-if="showTitleErr" class="error">A quiz title must be 5 letter or longer</p>
        </div>
        <div class="dropdown">
          <button @click="toggleDropdown" class="dropdown-button">
            {{ selectedOptions.length ? selectedOptions.join(", ") : "Select options" }}
            <arrow-right-component class="arrow" v-if="!isOpen"></arrow-right-component>
            <arrow-down-component class="arrow" v-else></arrow-down-component>
          </button>
          <div v-if="isOpen" class="dropdown-content">
            <div v-for="option in options" :key="option" class="dropdown-item">
              <label>
                {{ option }}
              </label>
              <input
                type="checkbox"
                :value="option"
                v-model="selectedOptions"
              />
            </div>
          </div>
        </div>
        <div class="description">
          <p>Quiz description</p>
          <textarea v-model="description" placeholder="Write a description"></textarea>
          <p v-if="showDescriptionErr" class="error">The quiz description must be 10 letter or longer</p>
        </div>
        <div class="title">
          <p>Upload image</p>
          <input v-model="imageUrl" class="text-input" placeholder="Image url">
          <p v-if="showImageErr" class="error">An image url must start with either http:// or https://, and end with either jpg, jpeg, png, or gif</p>
        </div>
        <button @click="handleSubmit" class="submit-btn">Submit</button>
      </div>
    </div>
    <div class="image-container"></div>
  </div>
  <footer-component></footer-component>
</template>

<style scoped>
.dropdown {
  width: 100%;
  position: relative;
  display: inline-block;
}

.dropdown-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 80px;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  background-color: #f0f0f0;
  padding: 10px;
  cursor: pointer;
  user-select: none;
}

.arrow {
  color: black;
}

.dropdown-content {
  width: 100%;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  position: absolute;
  background-color: white;
  z-index: 1;
  margin-top: 1px;
}

.dropdown-item {
  display: flex;
  justify-content: space-between;
  padding: 10px;
  cursor: pointer;
}

.dropdown-item input {
  height: 30px;
  width: 30px;
  margin-right: 5px;
}

.createQuiz-main {
  flex: 1;
  display: flex;
}

.image-container {
  width: 50%;
  background-image: url('@/assets/create-quiz.png');
  background-size: auto auto;
  background-position: center;
  background-repeat: no-repeat;
}

.content {
  width: 50%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  padding: 20px;
}

@media (max-width: 767px) {
  .image-container {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: -1;
  }

  .content {
    width: 80%;
    background-color: white;
    border-radius: 5px;
  }
}

.h1-title {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.login-details p {
  margin: 0;
}

.title {
  margin: 30px 0;
}

.text-input {
  width: 100%;
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  background-color: #f0f0f0;
  padding-left: 10px;
}

.submit-btn, .quiz-img-btn {
  height: 80px;
  width: 100%;
  color: white;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  cursor: pointer;
}

.submit-btn {
  background-color: #0077C0;
}

.quiz-img-btn {
  color: black;
  margin-bottom: 30px;
}

.description {
  margin-top: 30px;
}

.description textarea {
  width: 100%;
  height: 150px;
  min-height: 50px;
  max-height: 500px;
  resize: vertical;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  background-color: #f0f0f0;
}

.error {
  color: #b00000;
}
</style>