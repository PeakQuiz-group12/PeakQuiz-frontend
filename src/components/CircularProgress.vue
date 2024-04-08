<template>
  <svg viewBox="0 0 36 36" class="circular-chart">
    <path class="circle-bg"
          d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <path class="circle"
          :style="circleStyle"
          d="M18 2.0845
        a 15.9155 15.9155 0 0 1 0 31.831
        a 15.9155 15.9155 0 0 1 0 -31.831"
    />
    <text x="18" y="20.35" class="percentage">{{ score }}/{{maxScore}}</text>
  </svg>
</template>

<script>
export default {
  props: {
    score: {
      type: Number,
      required: true
    },
    maxScore: {
      type:Number,
      required: true,
    },
  },
  created() {
    console.log("Score:", this.score, "MaxScore:", this.maxScore);
  },

  computed: {
    circleStyle() {
      console.log(this.maxScore)
      const progress = (this.score / this.maxScore) * 100;
      let strokeColor;

      if (this.score / this.maxScore <= 0.3) {
        strokeColor = '#ff3e3e'; // Red for low scores (0-30%)
      } else if (this.score / this.maxScore <= 0.7) {
        strokeColor = '#ffae00'; // Yellow for medium scores (30-70%)
      } else {
        strokeColor = '#4caf50'; // Green for high scores (>70%)
      }

      return {
        strokeDasharray: `${progress} 100`,
        stroke: strokeColor
      };
    }
  }
};
</script>

<style scoped>
.circular-chart {
  margin: 0.5rem auto; /* Adds automatic margin to left and right */
  display: block;
  width: 80%; /* Responsive width */
  max-width: 80px; /* Maximum width */
  height: auto; /* Maintain aspect ratio */
}


.circle-bg {
  fill: none;
  stroke: #eee;
  stroke-width: 3.8;
}

.circle {
  fill: none;
  stroke-width: 2.8;
  stroke-linecap: round;
  animation: progress 1s ease-out forwards;
}

@keyframes progress {
  0% {
    stroke-dasharray: 0 100;
  }
}

.percentage {
  fill: #333;
  font-family: sans-serif;
  font-size: 0.5em;
  text-anchor: middle;
  dominant-baseline: middle; /* Vertically center in the SVG */
}
@media (max-width: 768px){
  .circular-chart {
    width: 50%; /* Adjust width as necessary */
    max-width: 80px; /* Adjust max width as necessary */
    height: auto; /* Maintain aspect ratio */
    margin: 0.5rem auto; /* Center the chart in the available space */
  }

  .percentage {
    font-size: 0.6em; /* Adjust font size within the SVG */
  }
}
</style>
