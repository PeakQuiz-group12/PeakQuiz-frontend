<script setup>
import { ref, watch, onMounted, onUnmounted } from 'vue'
import SearchIcon from '@/components/iconComponents/searchIcon.vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const searchQuery = ref("");
const searchResults = ref([]);
const searchContainer = ref(null);  // Reference to the search container

const exampleSearchData = [
  "History Quiz",
  "Math Test",
  "Science Quiz",
  "Technology News",
  "Math Homework",
  "World Geography Quiz",
  "Physics Exam",
  "Chemistry Lab",
  "Programming Challenge",
  "Biology Fieldwork",
  "English Literature Essay",
  "Art History Review",
  "Digital Media Analysis",
  "Environmental Science Project",
  "Statistics Case Study",
  "Computer Science Algorithms",
  "Economic Theories",
  "Ancient Civilizations",
  "Modern History Debates",
  "Music Theory Exam"
];

watch(searchQuery, () => {
  if (searchQuery.value) {
    searchResults.value = exampleSearchData
      .filter(item => item.toLowerCase().includes(searchQuery.value.toLowerCase()))
      .slice(0, 5);
  } else {
    searchResults.value = [];
  }
});

const handleOutsideClick = (event) => {
  if (!searchContainer.value.contains(event.target)) {
    searchResults.value = [];
  }
};

onMounted(() => {
  document.addEventListener('click', handleOutsideClick);
});

onUnmounted(() => {
  document.removeEventListener('click', handleOutsideClick);
});

const navigateToHome = () => {
  router.push('/');
};

const navigateToProfile = () => {
  router.push('/profile');
};

const navigateToCreateQuiz = () => {
  router.push('/createQuiz');
};
</script>

<template>
  <header class="header">
    <div class="logo" @click="navigateToHome">PeakQuiz</div>
    <div class="search-container" ref="searchContainer"> <!-- Bind the ref here -->
      <div class="search-bar">
        <input class="search-input" type="search" placeholder="Search..." v-model="searchQuery">
        <button class="search-btn" @click="search">
          <SearchIcon class="search-icon"/>
        </button>
      </div>
      <ul v-if="searchResults.length" class="search-result-list">
        <li v-for="result in searchResults" :key="result">{{ result }}</li>
      </ul>
    </div>
    <div class="btn-and-profile">
      <button class="create-btn" @click="navigateToCreateQuiz">Create</button>
      <button class="template-btn">Templates</button>
      <img class="profile-img" src="/src/assets/profile-picture.jpg" @click="navigateToProfile" alt="profile picture">
    </div>
  </header>
</template>

<style scoped>
.header {
  display: flex;
  align-items: center;
  background-color: #0077C0;
  color: white;
  padding: 8px 16px;
  justify-content: space-between;
}

.logo {
  font-size: 40px;
  font-weight: bold;
  margin-right: 20px;
  cursor: pointer;
}

@media (max-width: 767px) {
  .template-btn {
    display: none;
  }
}

.search-bar {
  width: 100%;
  max-width: 600px;
  height: 50px;
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
  background-color: #f0f0f0;
  padding-left: 10px;
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
  display: flex;
  justify-content: flex-end;
}

.create-btn,
.template-btn {
  height: 50px;
  max-width: 200px;
  font-size: 20px;
  margin-right: 10px;
  padding: 0 5px;
  border-radius: 5px;
  border: solid 2px black;
  cursor: pointer;
  color: black;
}

.profile-img {
  height: 50px;
  border-radius: 100%;
  cursor: pointer;
}

.search-result-list {
  list-style: none;
  padding: 0;
  background: white;
  border: 2px solid black;
  border-radius: 5px;
  margin-top: 1px;
  position: absolute;
  z-index: 10;
}

.search-result-list li {
  padding: 10px;
  cursor: pointer;
  color: black;
}

.search-result-list li:hover {
  background-color: #f0f0f0;
}
</style>
