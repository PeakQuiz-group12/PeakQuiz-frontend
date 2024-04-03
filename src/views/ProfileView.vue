<template>
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
</template>

<script>
import ProfileHeader from '@/components/ProfileHeader.vue';
import ProfilePageQuizzes from "@/components/ProfilePageQuizzes.vue";
import ProfileRating from "@/components/ProfileRating";
import logo from '@/assets/__test__/ProfilePageAssets/logo.png';

export default {
  name: 'profileView',
  components: {
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