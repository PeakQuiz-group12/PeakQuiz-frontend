<template>
  <accountSettings :userImg="profileImg" />
</template>

<script>
import AccountSettings from "@/components/accountSettings";
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
