<template>
  <header-component></header-component>
  <div class = "profileView-container">
    <ProfileHeader
        :user-image="userImage"
        :user-name="userName"
        :user-title="userTitle"
        :completed="completed"
        :rating="rating"
        :quizzes="quizzes.length"
    />
    <ProfileRating/>
    <ProfilePageQuizzes
        :games="games"
        :tags="tags"
        :quizzes="quizzes"
    />
  </div>
  <footer-component></footer-component>
</template>

<script setup>
import HeaderComponent from '@/components/headerComponent.vue'
import ProfileHeader from '@/components/ProfileHeader.vue'
import ProfilePageQuizzes from '@/components/ProfilePageQuizzes.vue'
import FooterComponent from '@/components/footerComponent.vue'
import ProfileRating from '@/components/ProfileRating.vue'
import { ref, onMounted } from "vue";
import { userStore } from '@/stores/userStore.js'

const user = userStore();

// State exposed to the template
const games = ref([]);
const tags = ref([]);
const quizzes = ref([]);
const userName = user.username;
const completed = quizzes.length;
const rating = 4.5;
const userImage = "/src/assets/profile-picture.jpg";
const userTitle = "Software Engineer";

onMounted(async () => {
  await user.fetchGames();
  games.value = user.games;
  await user.fetchTags();
  tags.value = user.tags;
  if (games) await user.fetchPlayedQuizzes(games.value);
  quizzes.value = user.quizzes;
});
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
</style>