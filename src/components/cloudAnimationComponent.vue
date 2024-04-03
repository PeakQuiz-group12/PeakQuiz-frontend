<template>
  <div class="cloud-container"
       @mouseover="isHovered=true"
       @mouseleave="isHovered=false">
    <img class="cloud1" src="/src/assets/cloud.png"
         alt="Cloud 1"
         :class="{'move-left': isHovered}" />
    <img class="cloud2" src="/src/assets/cloud.png"
         alt="Cloud 2"
         :class="{'move-right': isHovered}" />
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isHovered = ref(false)
</script>

<style scoped>
.cloud-container {
  position: relative;
  height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  overflow: hidden;
}

.cloud1, .cloud2 {
  position: absolute;
  top: 0;
  height: 400px;
  transition: transform 1s ease;
}

.cloud1 {
  transform: translateX(-120px);
}

.cloud2 {
  transform: translateX(120px);
}

.move-left {
  transform: translateX(-450px);
}

.move-right {
  transform: translateX(450px);
}
</style>
