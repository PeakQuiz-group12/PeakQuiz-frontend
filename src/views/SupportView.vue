<script setup>
import HeaderComponent from '@/components/headerComponent.vue'
import FooterComponent from '@/components/footerComponent.vue'
import { ref } from 'vue'
import { useAuth } from '@/useAuth.js'
import { useRouter } from 'vue-router'

const { refreshTokenIfNeeded } = useAuth();

const sendMailErr = ref("")

const subject = ref("")
const message = ref("")

const router = useRouter()

const navigateToHome = () => {
  router.push('/');
};

const sendEMail = async () => {
  const formData = new URLSearchParams();
  formData.append('username', sessionStorage.getItem("username"));
  formData.append('subject', subject.value);
  formData.append('message', message.value);

  const token = await refreshTokenIfNeeded();

  try {
    const response = await fetch('http://localhost:8080/support', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Bearer ${token}`,
      },
      body: formData,
    });

    if (response.ok) {
      const result = await response.text();
      console.log("successful", result);
      navigateToHome()
    } else {
      console.error(response.status);
      sendMailErr.value = "Your message was not sent";
    }
  } catch (error) {
    console.error("Error:", error);
    sendMailErr.value = "Error: " + error.message;
  }
};
</script>

<template>
  <header-component></header-component>
  <div class="support-main">
    <div class="content">
      <div class="h1-title">
        <h1>Support</h1>
      </div>
      <div class="login-details">
        <div class="subject">
          <p>Subject</p>
          <input v-model="subject" placeholder="Subject">
        </div>
        <div class="message">
          <p>Write you message here</p>
          <textarea v-model="message"></textarea>
        </div>
        <button @click="sendEMail" class="submit-btn">Submit</button>
        <p>{{ sendMailErr }}</p>
      </div>
    </div>
    <div class="image-container"></div>
  </div>
  <footer-component></footer-component>
</template>

<style scoped>
.support-main {
  flex: 1;
  display: flex;
}

.image-container {
  width: 50%;
  background-image: url('@/assets/support-mountain.png');
  background-size: auto auto;
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
    height: 100%;
    z-index: -1;
  }

  .content {
    width: 80%;
    background-color: white;
    border-radius: 5px;
  }
}

.h1-title {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.login-details p {
  margin: 0;
}

input {
  width: 100%;
  height: 50px;
  font-size: 20px;
  margin-bottom: 30px;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  background-color: #f0f0f0;
  padding-left: 10px;
}

.submit-btn {
  height: 80px;
  width: 100%;
  background-color: #0077C0;
  color: white;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  cursor: pointer;
}

.message textarea {
  width: 100%;
  height: 150px;
  min-height: 50px;
  max-height: 500px;
  resize: vertical;
  margin-bottom: 30px;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  background-color: #f0f0f0;
}
</style>