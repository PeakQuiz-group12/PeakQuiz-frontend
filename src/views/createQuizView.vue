<script setup>
import CreateQuizFirstPageComponent from '@/components/createQuizFirstPageComponent.vue'
import CreateQuizEditQuestions from '@/components/CreateQuizEditQuestions.vue'
import { ref } from 'vue'

const quiz = {name: "test", questions: []}

const firstPage = ref(true)

const handleFirstPageSubmission = () => {
  //ENDPOINT
  firstPage.value = false
}
</script>

<template>
  <create-quiz-first-page-component v-if="firstPage"
                                    @submit-btn-clicked="handleFirstPageSubmission"></create-quiz-first-page-component>
  <create-quiz-edit-questions v-else :quiz-from-parent="quiz"></create-quiz-edit-questions>
</template>
