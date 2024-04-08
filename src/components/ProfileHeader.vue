<template>
  <div class="profile-header">
    <div class="profile-image-container">
      <img :src="userImage" class="profile-image" alt="profile image" />
    </div>
    <div class="user-info">
      <div class = "user-info-username">
        <h1>{{ userName }}</h1>
      </div>

      <p>{{ userTitle }}</p>
    </div>
    <div class="stats">
      <div class="stat">
        <span class="number">{{ quizzes }}</span>
        <span class="label">Completed</span>
      </div>
    </div>
  </div>
</template>

<script>
import logo from '@/assets/__test__/ProfilePageAssets/logo.png';
export default {
  name: 'ProfileHeader',
  props: {
    userImage: {
      type: String,
      default: logo // Replace with actual path to your default image
    },
    userName: {
      type: String,
      required: true,
    },
    userTitle: {
      type: String,
      default: 'Trivia Titan'
    },
    completed: Number,
    quizzes: Number
  },
};
</script>

<style scoped>
.profile-header {
  display: flex;
  align-items: center;
  padding: 10px;
}
.profile-image-container {
  flex-shrink: 0;
}
.profile-image {
  width: 50px; /* Adjust as needed */
  height: 50px; /* Adjust as needed */
  border-radius: 50%;
  object-fit: cover;
}
.user-info {
  margin-left: 10px;
}
.user-info-username {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.editProfileBtn {
  margin: 0.5rem;
  background-color: #575353;
  width: auto;
  color: white;
  padding: 5px;
}
.stats {
  margin-left: auto;
  display: flex;
  justify-content: space-around;
  color: #000; /* Light text color for contrast */
  padding: 20px 0; /* Add some padding above and below */
  font-family: 'Arial', sans-serif; /* Use a sans-serif font */
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative; /* Needed for the pseudo-elements */
  padding: 0 15px; /* Adjust the spacing between stats as needed */
}

/* Add dividers between stats */
.stat:not(:first-child):before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  height: 50%; /* Adjust height of the divider line */
  border-left: 2px solid #000000; /* This creates the divider */
}

.number {
  font-size: 2em; /* Larger font size for the number */
  font-weight: bold; /* Make the number bold */
  margin-bottom: 5px; /* Space between number and label */
}

.label {
  font-size: 0.75em; /* Smaller font size for the label */
  letter-spacing: 1px; /* Add some letter spacing */
  text-transform: uppercase; /* Uppercase for the label */
}

</style>