<script setup lang="ts">

import { onUnmounted } from 'vue'
import router from '@/router'

onUnmounted(() => {
  logoutUser()
})

const logoutUser = async () => {
  sessionStorage.removeItem("isLoggedIn");
  sessionStorage.removeItem("username");
  sessionStorage.removeItem("accessToken");
  sessionStorage.removeItem("refreshToken");
  await router.push("/")
  console.log("Logout successful");
}
</script>

<template>
  Hello
</template>