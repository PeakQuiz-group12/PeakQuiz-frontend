<script setup>
import ContactSupportComponent from '@/components/iconComponents/contactSupportComponent.vue'
import ArrowUpComponent from '@/components/iconComponents/arrowUpComponent.vue'
import { useRouter } from 'vue-router'

const router = useRouter();

const navigateToSupport = () => {
  router.push('/support');
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  });
};
</script>

<template>
  <div class="main-footer">
    <p>Copyright © VAB YAM LMLN HLX, 2024</p>
    <div class="links">
      <contact-support-component></contact-support-component>
      <p @click="navigateToSupport">Support</p>
      <p class="divider">|</p>
      <p @click="scrollToTop">Go To Top</p>
      <arrow-up-component></arrow-up-component>
    </div>
  </div>
</template>

<style scoped>
.main-footer {
  height: 150px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: #0077C0;
  color: white;
  font-size: 20px;
}

.links {
  display: flex;
  flex-direction: row;
  margin-top: 15px;
}

.divider {
  margin: 0 10px
}

.links p {
  display: flex;
}

.links p:hover {
  text-decoration: underline;
  cursor: pointer;
}
</style>