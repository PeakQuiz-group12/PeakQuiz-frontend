<template>
  <!-- Title of the list-->
  <h3 class="title">Rating</h3>

  <div class="divider"></div>
  <div class="rating-tracker">
    <!-- Previous Rank -->
    <div class="rank previous-rank" v-if="previousRank">
      <img :src="previousRank.iconPath" alt="Previous Rank">
      <span>{{previousRank.name}}</span>
    </div>

    <!-- Just for styling -->
    <h2 class="rank-link">&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;</h2>


    <!-- Current Rank (Enlarged) -->
    <div class="rank current-rank" v-if="currentRank">
      <img :src="currentRank.iconPath" alt="Current Rank" class="enlarged">
      <span>{{ currentRank.name }}</span>
    </div>

    <h2 class="rank-link">&nbsp;-&nbsp;-&nbsp;-&nbsp;-&nbsp;</h2>


    <!-- Next Rank -->
    <div class="rank next-rank" v-if="nextRank">
      <img :src="nextRank.iconPath" alt="Next Rank">
      <span>{{ nextRank.name }}</span>
    </div>
  </div>
  <!-- Progress Bar -->
  <div class="progress-bar-container">
    <div class="progress-bar" :style="{width: progressBarWidth}"></div>
    <div class="rating-threshold start">{{ previousRank.threshold }}</div>
    <span class="user-rating" :style="{left: userRatingLeft}">{{ currentRating }}</span>
    <div class="rating-threshold end">{{ nextRank.threshold }}</div>
  </div>
</template>

<script>
import bronzeIconPath from '@/assets/__test__/ProfilePageAssets/bronze.webp';
import silverIconPath from '@/assets/__test__/ProfilePageAssets/silver.webp';
import goldIconPath from '@/assets/__test__/ProfilePageAssets/gold.webp';
import diamondIconPath from '@/assets/__test__/ProfilePageAssets/diamond.webp';
import masterIconPath from '@/assets/__test__/ProfilePageAssets/master.webp';

export default {

  data() {
    return {
      currentRating: 42, // Replace with dynamic value as needed
      ranks: [
        { name: 'Bronze', threshold: 0, iconPath: bronzeIconPath },
        { name: 'Silver', threshold: 25, iconPath: silverIconPath },
        { name: 'Gold', threshold: 50, iconPath: goldIconPath },
        { name: 'Diamond', threshold: 75, iconPath: diamondIconPath },
        { name: 'Master', threshold: 100, iconPath: masterIconPath },
      ],
    };
  },
  computed: {
    currentRankIndex() {
      return this.ranks.findIndex(rank => this.currentRating < rank.threshold) - 1;
    },
    currentRank() {
      return this.ranks[this.currentRankIndex];
    },
    previousRank() {
      return this.ranks[this.currentRankIndex - 1];
    },
    nextRank() {
      return this.ranks[this.currentRankIndex + 1];
    },
    progressBarWidth() {
      if (!this.previousRank || !this.nextRank) return '0%';
      const range = this.nextRank.threshold - this.previousRank.threshold;
      const progress = this.currentRating - this.previousRank.threshold;
      return (progress / range) * 100 + '%';
    },
    userRatingLeft() {
      if (!this.previousRank || !this.nextRank) return '0%';
      const range = this.nextRank.threshold - this.previousRank.threshold;
      const progress = this.currentRating - this.previousRank.threshold;
      const percentage = (progress / range) * 100;
      // Prevent the user rating from going beyond the progress bar's boundaries
      const maxOffset = Math.min(percentage, 100);
      return `calc(${maxOffset}% - 14px)`; // 14px approximately half the user rating width
    },
  }
};
</script>

<style scoped>

.title {
  font-size: 20px;
  margin-bottom: 20px;
}

h2.rank-link {
  font-size: 28px; /* Adjust this size as needed for large screens */
}

.rating-tracker {
  height: 100px;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}

.rank {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin: 3rem;
}
.user-rating {
  position: absolute;
  top: -25px;
  /* Dynamically calculated left offset instead of 50% */
  /* This will be set in the inline style */
  transform: translateX(-50%);
  font-weight: bold;
  background: white;
  padding: 2px 5px;
  border-radius: 4px;
  white-space: nowrap; /* Prevents the text from wrapping */
}

/* Ensure the images have enough space and do not overlap */
.rank img {
  width: 50px; /* Use width instead of max-width to ensure consistent size */
  height: 50px; /* Use height instead of max-height for the same reason */
  margin-bottom: 5px; /* Add some space between the image and the text */
}

.current-rank img.enlarged {
  width: 75px;
  height: 75px;
  margin: 10px;
}


.divider {
  margin-bottom: 1rem;
  position: relative;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  height: 7px;
  width: 100%;
  background-color: #0077C0;
}



.enlarged {
  transform: scale(1.2); /* Enlarge the current rank */
}

.progress-bar-container {
  position: relative;
  flex-grow: 1;
  height: 20px;
  background: #eee;
  margin-top:  3rem;
  display: flex;
  align-items: center;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #ffd700, #ff8c00); /* Example gradient */
  transition: width 0.3s ease-in-out; /* Smooth transition for width change */
}

.rating-threshold {
  position: absolute;
  color: #333;
}

.rating-threshold.start {
  left: 0;
}

.rating-threshold.end {
  right: 0;
}


@media (max-width: 600px) {
  .user-rating {
    top: 25px;
  }

}
@media (max-width: 1024px) {
  h2.rank-link {
    font-size: 24px; /* Smaller size for tablet screens */
  }
}

@media (max-width: 768px) {
  h2.rank-link {
    font-size: 15px; /* Even smaller size for mobile screens */
    font-weight: bold;
  }
}

@media (max-width: 480px) {
  h2.rank-link {
    font-size: 16px; /* Smallest size for very small screens */
    font-weight: bold;
  }


}

</style>