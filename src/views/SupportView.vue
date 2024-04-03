<script setup>
import HeaderComponent from '@/components/headerComponent.vue'
import FooterComponent from '@/components/footerComponent.vue'
</script>

<template>
  <header-component></header-component>
  <div class="support-main">
    <div class="content">
      <div class="h1-title">
        <h1>Support</h1>
      </div>
      <div class="login-details">
        <div class="category">
          <p>Category</p>
          <input placeholder="Category">
        </div>
        <div class="title">
          <p>Title</p>
          <input placeholder="Enter your email address">
        </div>
        <div class="message">
          <p>Write you message here</p>
          <textarea></textarea>
        </div>
        <button class="submit-btn">Submit</button>
      </div>
    </div>
    <div class="image-container"></div>
  </div>
  <footer-component></footer-component>
</template>

<style scoped>
.support-main {
  display: flex;
}

.image-container {
  width: 50%;
  background-image: url('@/assets/support-mountain.png');
  background-size: auto auto;
  background-position: center;
  background-repeat: no-repeat;
  height: calc(100vh - 216px);
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

.h1-title {
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.login-details p {
  margin: 0;
}

.category, .title {
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
  resize: vertical;
  margin-bottom: 30px;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  background-color: #f0f0f0;
}
</style>