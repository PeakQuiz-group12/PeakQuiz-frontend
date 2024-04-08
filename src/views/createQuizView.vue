<script setup>
import CreateQuizFirstPageComponent from '@/components/createQuizFirstPageComponent.vue'
import CreateQuizEditQuestions from '@/components/CreateQuizEditQuestions.vue'
import { ref } from 'vue'
import { useAuth } from '@/useAuth.js'

const { refreshTokenIfNeeded } = useAuth();

const quiz = ref();

const firstPage = ref(true);

const handleFirstPageSubmission = async (data) => {
  await createQuiz(data.title, Array.from(data.categories), data.description, data.imageUrl)

  firstPage.value = false;
}

const createQuiz = async (title, categories, description, imageUrl) => {
  const data = {
    title: title,
    categories: categories,
    description: description,
    imageUrl: imageUrl
  };

  const token = await refreshTokenIfNeeded();

  try {
    const response = await fetch('http://localhost:8080/quizzes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const result = await response.json();
      console.log("successful", result);
      quiz.value = result
    } else {
      console.error(response.status);
    }
  } catch (error) {
    console.error("Error:", error);
  }
};
</script>

<template>
  <create-quiz-first-page-component v-if="firstPage"
                                    @submit-btn-clicked="handleFirstPageSubmission"></create-quiz-first-page-component>
  <create-quiz-edit-questions v-else :quiz-from-parent="quiz"></create-quiz-edit-questions>
</template>
