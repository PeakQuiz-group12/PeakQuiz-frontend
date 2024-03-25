<script setup lang="ts">
import { ref } from 'vue'

const isLogin = ref(true)
const emailUsername = ref("")
const password = ref("")
const loginSignup = () => {
  console.log(isLogin.value)
}
</script>

<template>
  <div class="login-main">
    <div class="image-container"></div>
    <div class="content">
      <div class="login-signup-links">
        <h1 :class="{ active: isLogin }" @click="isLogin=true">Login</h1>
        <h1 :class="{ active: !isLogin }" @click="isLogin=false">Sign Up</h1>
      </div>
      <div class="login-details">
        <div class="email">
          <p>Email or Username</p>
          <input v-model="emailUsername" placeholder="Enter your email address or username">
        </div>
        <div class="password">
          <div class="p-and-forgot-password">
            <p>Password</p>
            <p style="color: #0077C0">Forgot Password</p>
          </div>
          <input v-model="password" placeholder="Enter your password">
        </div>
      </div>
      <div class="login-signup-btn">
        <button class="login-btn" @click="loginSignup">{{ isLogin ? 'Log in' : 'Sign up' }}</button>
        <button v-if="isLogin" class="register-btn" @click="isLogin=false">New to PeakQuiz? Create an account</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.login-main {
  width: 100%;
  display: flex;
  align-items: center;
}

.image-container {
  width: 50%;
  height: 100vh;
  background-image: url('@/assets/login-mountains.png');
  background-size: auto 1000px;
  background-position: center;
  background-repeat: no-repeat;
}

.content {
  width: 50%; /* Occupy the remaining half of the container */
  max-width: 600px; /* Max width for the content */
  display: flex;
  flex-direction: column;
  justify-content: center; /* Vertically center the flex items */
  margin: auto; /* Center the content block horizontally within its container */
  padding: 100px 20px; /* Adjusted from margin to padding for spacing inside the container */
}

.login-details p {
  margin: 0;
}

.login-signup-links {
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 30px;
}

.p-and-forgot-password {
  display: flex;
  justify-content: space-between;
}

.login-signup-btn {
  display: flex;
  flex-direction: column;
}

input {
  width: 100%;
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  margin-bottom: 30px;
  background-color: #f0f0f0;
}

.login-btn {
  height: 80px;
  background-color: #0077C0;
  color: white;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
}

.register-btn {
  height: 80px;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  margin-top: 20px;
}

.active {
  border-bottom: 2px solid #0077C0;
  padding-bottom: 2px;
}

h1:hover {
  color: #545454;
}
</style>