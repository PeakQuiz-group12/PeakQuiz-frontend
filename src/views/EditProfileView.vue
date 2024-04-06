<template>
  <div class="editProfileView-container">
    <accountSettings :userImg="profileImg" />
  </div>
</template>

<script>
import AccountSettings from "@/components/accountSettings.vue";
import profileImage from "@/assets/__test__/ProfilePageAssets/profileImage.png";
import { ref } from "vue";

export default {
  name: "EditProfile",
  components: {
    AccountSettings
  },
  setup() {
    const profileImg = ref(profileImage);
    return {
      profileImg
    };
  }
}
</script>
<style>
.editProfileView-container {
  padding: 0 15rem; /* This adds padding to the left and right */
}

@media (max-width: 763px) {
  .editProfileView-container {
    padding: 0 1rem; /* Less padding on smaller screens */
  }
}
</style>
