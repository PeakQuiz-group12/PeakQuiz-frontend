<template>
  <div class="donut-chart-container">
    <div class="donut-chart" :style="donutStyle"></div>
    <div class="donut-label">{{ correctPercentage.toFixed(0) }}%</div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const { correct, incorrect } = defineProps(["correct", "incorrect"])

const totalAnswers = computed(() => correct + incorrect);
const correctPercentage = computed(() => (correct / totalAnswers.value) * 100);

const donutStyle = computed(() => {
  const correctColor = '#4CAF50';
  const incorrectColor = '#FF5252';
  return {
    background: `conic-gradient(
      ${correctColor} 0% ${correctPercentage.value}%,
      ${incorrectColor} ${correctPercentage.value}% 100%
    )`
  };
});
</script>

<style scoped>
.donut-chart-container {
  position: relative;
  width: 200px;
  height: 200px;
}

.donut-chart {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  background-size: cover;
  position: relative;
}

.donut-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: #333;
  font-size: 2em;
  z-index: 10;
}

.donut-chart::before {
  content: '';
  position: absolute;
  top: 25px;
  left: 25px;
  right: 25px;
  bottom: 25px;
  background: #fff;
  border-radius: 50%;
  z-index: 5;
}
</style>
