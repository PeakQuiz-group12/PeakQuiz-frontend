<script setup lang="ts">
import { onUnmounted, ref } from 'vue'
import router from '@/router'

const isLogin = ref(true)
const username = ref("")
const email = ref("")
const password = ref("")
const registerErrUsername = ref("")
const registerErrEmail = ref("")
const registerErrPassword = ref("")
const loginErr = ref("")

const loginSignup = () => {
  registerErrUsername.value = ""
  registerErrEmail.value = ""
  registerErrPassword.value = ""
  loginErr.value = ""

  if (isLogin.value) {
    loginUser()
  }
  else {
    registerUser()
  }
}

const loginUser = async () => {
  const formData = new URLSearchParams();
  formData.append('username', username.value);
  formData.append('password', password.value);

  try {
    const response = await fetch('http://localhost:8080/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });
    if (response.ok) {
      const token = await response.json();
      sessionStorage.setItem("accessToken", token['accessToken']);
      sessionStorage.setItem("refreshToken", token['refreshToken']);
      sessionStorage.setItem("username", username.value);
      console.log("Login successful");
      await router.push("/")
    } else {
      const errorMsg = await response.text();
      console.error("Login failed with status", response.status, "Message:", errorMsg);
      loginErr.value = errorMsg;
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};


const registerUser = async () => {
  const formData = new URLSearchParams();
  formData.append('username', username.value);
  formData.append('mail', email.value);
  formData.append('password', password.value);

  try {
    const response = await fetch('http://localhost:8080/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });
    if (response.ok) {
      const token = await response.json();
      console.log("Registration successful");
      sessionStorage.setItem("accessToken", token['accessToken']);
      sessionStorage.setItem("refreshToken", token['refreshToken']);
      sessionStorage.setItem("username", username.value);
      await router.push("/");
    } else {
      const errorMsg = await response.text();
      console.error("Registration failed with status", response.status, "Message:", errorMsg);
      if (errorMsg.includes("already exists")) {
        registerErrUsername.value = errorMsg;
      }
      else if (errorMsg.includes("already in use") || errorMsg.includes("email format")) {
        registerErrEmail.value = errorMsg
      }
      else if (errorMsg.includes("Password must")) {
        registerErrPassword.value = errorMsg;
      }
    }
  } catch (error) {
    console.error("Registration error:", error);
  }
};

const navigateToForgotPassword = () => {
  router.push('/forgotPassword');
};
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
        <div class="username">
          <p>Username</p>
          <input v-model="username" placeholder="Enter your username">
          <p class="error" v-if="!isLogin">{{ registerErrUsername }}</p>
        </div>
        <div v-if="!isLogin" class="email">
          <p>Email</p>
          <input v-model="email" placeholder="Enter your email address">
          <p class="error">{{ registerErrEmail }}</p>
        </div>
        <div class="password">
          <div class="p-and-forgot-password">
            <p>Password</p>
            <p @click="navigateToForgotPassword" class="forgot-password">Forgot Password</p>
          </div>
          <input v-model="password" placeholder="Enter your password">
          <p class="error" v-if="isLogin">{{ loginErr }}</p>
          <p class="error" v-if="!isLogin">{{ registerErrPassword }}</p>
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
  height: 100vh;
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
  width: 50%;
  max-width: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: auto;
  padding: 20px;
}

@media (max-width: 767px) {
  .image-container {
    position: absolute;
    width: 100%;
    z-index: -1;
  }

  .content {
    width: 80%;
    background-color: white;
    border-radius: 5px;
  }
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

.forgot-password {
  color: #0077C0;
  cursor: pointer;
}

.forgot-password:hover {
  text-decoration: underline;
}

.login-signup-btn {
  display: flex;
  flex-direction: column;
}

.username, .password, .email {
  margin-bottom: 30px;
}

input {
  width: 100%;
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  background-color: #f0f0f0;
  padding-left: 10px;
}

.login-btn {
  height: 80px;
  background-color: #0077C0;
  color: white;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  cursor: pointer;
}

.register-btn {
  height: 80px;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  margin-top: 20px;
  cursor: pointer;
}

.active {
  border-bottom: 2px solid #0077C0;
  padding-bottom: 2px;
}

h1:hover {
  color: #545454;
}

.error {
  margin-top: 0;
  color: #b00000;
}
</style>