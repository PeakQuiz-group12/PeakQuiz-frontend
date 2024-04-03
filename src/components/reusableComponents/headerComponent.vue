<script setup>
import { ref } from 'vue';
import SearchIcon from '@/components/iconComponents/searchIcon.vue'

const searchQuery = ref("");

const search = () => {
  console.log(searchQuery.value)
}
</script>

<template>
  <header class="header">
    <div class="logo">PeakQuiz</div>
    <div class="search-and-buttons">
      <div class="search-bar">
        <input class="search-input" type="search" placeholder="Search..." v-model="searchQuery">
        <button class="search-btn" @click="search">
          <SearchIcon class="search-icon"/>
        </button>
      </div>
      <div class="btn-and-profile">
        <button class="create-btn">Create</button>
        <button class="template-btn">Templates</button>
        <img class="profile-img" src="/src/assets/profile-picture.jpg" alt="profile picture">
      </div>
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #0077C0;
  color: white;
  padding: 0.5em 1em;
}

.logo {
  font-size: 40px;
  font-weight: bold;
  margin-right: 20px;
}

@media (max-width: 767px) {
  .logo {
    display: none;
  }
}

.search-and-buttons {
  display: flex;
  flex: 1;
}

.search-bar {
  height: 50px;
  width: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  border-radius: 5px;
  margin-right: 10px;
  border: solid 2px black;
}

.search-input {
  height: 100%;
  width: 100%;
  flex-grow: 1;
  margin-right: 10px;
  font-size: 20px;
  border-radius: 5px;
  border: none;
  outline: none;
  background-color: #f0f0f0;;
}

.search-btn {
  height: 100%;
  width: 50px;
  border: none;
  box-sizing: border-box;
  border-radius: 5px;
  background-color: #f0f0f0;
  cursor: pointer;
}

.btn-and-profile {
  width: 50%;
  display: flex;
  justify-content: flex-end;
}

.create-btn,
.template-btn {
  height: 50px;
  width: 40%;
  max-width: 200px;
  font-size: 20px;
  margin-right: 10px;
  border-radius: 5px;
  border: solid 2px black;
  cursor: pointer;
}

.profile-img {
  height: 50px;
  border-radius: 100%;
  cursor: pointer;
}
</style>
