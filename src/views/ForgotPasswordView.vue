<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const email = ref("")

const sendMailErr = ref("")

const router = useRouter()

const navigateToLogin = () => {
  router.push('/login');
};

const forgotPasswordEmail = async () => {
  const formData = new URLSearchParams();
  formData.append('email', email.value);

  try {
    const response = await fetch('http://localhost:8080/forgotPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formData,
    });

    if (response.ok) {
      const result = await response.text();
      console.log("successful", result);
    } else {
      console.error(response.status);
      sendMailErr.value = response.status;
    }
  } catch (error) {
    console.error("Calculation error:", error);
    sendMailErr.value = "Error: " + error.message;
  }
  navigateToLogin()
};
</script>

<template>
  <div class="forgotPassword-main">
    <div class="forgot-password-box">
      <h2>If you have forgotten your password you can submit you email, and your password will be sent to you.</h2>
      <div class="email">
        <p>Your Email</p>
        <input class="email-input" v-model="email" placeholder="Your Email">
        <p>{{ sendMailErr }}</p>
      </div>
      <button @click=forgotPasswordEmail class="submit-btn">Submit</button>
    </div>
  </div>
</template>

<style scoped>
.forgotPassword-main {
  height: 100vh;
  width: 100vw;
  display: flex;
  align-items: center;
  justify-content: center;
}

.forgot-password-box {
  width: 80%;
  max-width: 600px;
  min-height: 400px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  justify-content: center;
  padding: 20px;
  border: solid 2px black;
  border-radius: 5px;
  background-color: #C7EEFF;
}

.email {
  width: 80%;
  margin-top: 30px;
  text-align: left;
}

.email-input {
  width: 100%;
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  background-color: #f0f0f0;
  padding-left: 10px;
}

.submit-btn {
  height: 80px;
  width: 80%;
  margin-top: 30px;
  background-color: #0077C0;
  color: white;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  cursor: pointer;
}
</style>