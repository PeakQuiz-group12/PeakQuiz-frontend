<template>
  <header-component></header-component>
  <div class = "profileView-container">
    <ProfileHeader
        :user-image="userImage"
        :user-name="userName"
        :user-title="userTitle"
        :completed="completed"
        :quizzes="quizzes.length"
    />
    <ProfilePageQuizzes
        :games="games"
        :quizzes="quizzes"
    />
    <div class="divider"></div>
    <h1>Tags</h1>
    <div class="all-tags">
      <div class="question-tag" v-for="(tag, index) in tags" :key="index">
        <h3>{{ tag.title }}</h3>
        <p class="question" @click="navigateToPlayQuiz(question.quizId)" v-for="(question, index2) in tag.questions" :key=index2>{{ question.text }}</p>
      </div>
    </div>
    <quiz-row-component :row-name="'Your Quizzes'" :quiz-map="usersQuizzes.content"></quiz-row-component>
  </div>
  <footer-component></footer-component>
</template>

<script setup>
import HeaderComponent from '@/components/headerComponent.vue'
import ProfileHeader from '@/components/ProfileHeader.vue'
import ProfilePageQuizzes from '@/components/ProfilePageQuizzes.vue'
import FooterComponent from '@/components/footerComponent.vue'
import { ref, onMounted } from "vue";
import { useUserStore } from '@/stores/userStore.js'
import { useCollaboratorStore } from '@/stores/collaboratorStore.js'
import { useRouter } from 'vue-router'
import QuizRowComponent from '@/components/quizRowComponent.vue'

const userStore = useUserStore();
const collaboratorStore = useCollaboratorStore()

// State exposed to the template
const games = ref([]);
const tags = ref([]);
const quizzes = ref([]);
const usersQuizzes = ref([])
const userName = userStore.username;
const completed = quizzes.value.length;
const userImage = "/src/assets/profile-picture.jpg";
const userTitle = "Software Engineer";

onMounted(async () => {
  await userStore.fetchGames();
  await userStore.fetchTags()
  await collaboratorStore.fetchUserQuizzes("CREATOR")

  games.value = userStore.games;
  tags.value = userStore.tags
  usersQuizzes.value = collaboratorStore.userQuizzes

  if (games.value) {
    await userStore.fetchPlayedQuizzes(games.value);
  }
  quizzes.value = userStore.quizzes;
});

const router = useRouter()

const navigateToPlayQuiz = (quizId) => {
  router.push('/playQuiz/' + quizId);
};
</script>

<style>
.profileView-container {
  padding: 0 15rem; /* This adds padding to the left and right */
}

@media (max-width: 763px) {
  .profileView-container {
    padding: 0 1rem; /* Less padding on smaller screens */
  }
}

.all-tags {
  display: flex;
  flex-wrap: wrap;
  margin-right: 5px;
  justify-content: flex-start;
  gap: 10px;
}

.question-tag {
  flex: 0 0 calc(20% - 10px);
  border-radius: 5px;
  border: 2px solid black;
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.question {
  color: blue;
}

.question:hover {
  text-decoration: underline;
  color: #3f0098;
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
</style>