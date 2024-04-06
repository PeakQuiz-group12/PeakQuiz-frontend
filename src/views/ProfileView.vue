<template>
  <header-component></header-component>
  <div class = "profileView-container">
    <ProfileHeader
        :user-image="userImage"
        :user-name="userName"
        :user-title="userTitle"
        :completed="completed"
        :rating="rating"
        :quizzes="quizzes"
    />
    <ProfilePageQuizzes
        :title="CompletedQuizList.title"
        :is-completed="CompletedQuizList.isCompleted"/>
    <ProfileRating/>
    <ProfilePageQuizzes
        :title="MyQuizList.title"
        :is-completed="MyQuizList.isCompleted"/>
  </div>
  <footer-component></footer-component>
</template>

<script>
import ProfilePageQuizzes from "@/components/ProfilePageQuizzes.vue";
import ProfileRating from "@/components/ProfileRating.vue";
import logo from '@/assets/__test__/ProfilePageAssets/logo.png';
import ProfileHeader from '@/components/ProfileHeader.vue'
import HeaderComponent from '@/components/headerComponent.vue'
import FooterComponent from '@/components/footerComponent.vue'

export default {
  name: 'profileView',
  components: {
    FooterComponent,
    HeaderComponent,
    ProfileHeader,
    ProfilePageQuizzes,
    ProfileRating
  },
  data() {
    return {
      userImage: logo,
      userName: 'Quiz Master',
      userTitle: 'Trivia Titan',
      completed: 11,
      rating: 42,
      quizzes: 10,
      CompletedQuizList: {
        title: 'Completed',
        isCompleted: true,
      },
      MyQuizList: {
        title: 'My Quiz List',
        isCompleted: false,
      }
    };
  }
}
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