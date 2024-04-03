<template>
  <div></div>
  <div class="account-settings-container">
    <div class="settings-form">
      <h2>Account settings</h2>
      <div class="line"></div>
      <h3>Profile</h3>
      <form>
        <div class="profile-image-container">
          <img :src="userImg" class="profile-image" alt="User profile image" />
        </div>
        <div class="editUsername">
          <p class="text">Username</p>
          <input v-model="username" placeholder="Enter your username" @blur="validateUsername">
          <p class="error" v-if="updateErrUsername">{{ updateErrUsername }}</p>
        </div>

        <div class="editEmail">
          <p class="text">Email</p>
          <input v-model="email" placeholder="Enter your email address" @blur="validateEmail">
          <p class="error" v-if="updateErrEmail">{{ updateErrEmail }}</p>
        </div>
        <div class = "editTitle">
          <label for="title">Title</label>
          <select id="title" v-model="title">
            <option>Trivia titan</option>
            <!-- other options -->
          </select>
        </div>


        <button type="submit">Save Changes</button>
      </form>
    </div>
  </div>
</template>
<script>
import {ref, watch} from 'vue';
export default {
  name: 'AccountSettings',

  props:{
    userImg: {
      type: String,
    }

  },

  setup() {

    const username = ref('Quiz Master');
    const email = ref('feathers.mcgraw@gmail.com');
    const title = ref('Trivia titan');
    const showImage = ref(true); // Controls the visibility of the profile image

    const updateErrUsername = ref("");
    const updateErrEmail = ref("");

    // Validation logic
    const isValidUsername = ref(true);
    const isValidEmail = ref(true);

    const validateUsername = () => {
      // Replace with your own validation logic
      isValidUsername.value = !!username.value && username.value.length > 3;
      updateErrUsername.value = isValidUsername.value ? "" : "Username must be longer than 3 characters.";
    };

    const validateEmail = () => {
      // Simple regex for email validation
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      isValidEmail.value = emailPattern.test(email.value);
      updateErrEmail.value = isValidEmail.value ? "" : "Please enter a valid email address.";
    };

    watch(username, validateUsername);
    watch(email, validateEmail);

    const updateUser = async () => {
      validateUsername();
      validateEmail();
      if (!isValidUsername.value || !isValidEmail.value) {
        // Stop the update if validation fails
        return;
      }

      const formData = new URLSearchParams();
      formData.append('username', username.value);
      formData.append('email', email.value);
      formData.append('title', title.value);

      try {
        const response = await fetch('http://localhost:8080/updateUser', {
          method: 'PUT', // Assuming 'PUT' is used for updating user details
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Bearer ' + sessionStorage.getItem("accessToken") // Assuming you are using Bearer token
          },
          body: formData,
        });

        if (response.ok) {
          console.log("Update successful");
          // Handle successful update
        } else {
          const errorMsg = await response.text();
          console.error("Update failed with status", response.status, "Message:", errorMsg);
          // Handle error based on the errorMsg
          if (errorMsg.includes("username")) {
            updateErrUsername.value = errorMsg;
          } else if (errorMsg.includes("email")) {
            updateErrEmail.value = errorMsg;
          }
        }
      } catch (error) {
        console.error("Update error:", error);
      }
    };




    return {
      username,
      email,
      title,
      showImage,
      updateErrUsername,
      updateErrEmail,
      updateUser
    };

  },

};
</script>

<style scoped>
.account-settings-container {
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: flex-start;
  max-width: 1000px; /* Adjust based on your layout */
  margin: auto;
  gap: 20px; /* Spacing between form and image */
}

.profile-image-container {
  flex-shrink: 0;
}
.profile-image {
  margin-top: 2rem;
  width: 150px; /* Adjust as needed */
  height: 150px; /* Adjust as needed */
  border-radius: 50%;
  object-fit: cover;
}


.settings-form {
  display: flex;
  flex-direction: column;
  width: 50%; /* Adjust based on your layout */
  padding: 20px;
  background: #ffffff; /* Assuming a white background */
}

.settings-form h2 {
  margin-bottom: 5px; /* Spacing below the heading */
}

.text {

  margin: 0;
}


.editEmail, .editUsername, .editTitle, .profile-image-container {
  margin-bottom: 30px;
}
h3 {
  text-decoration: underline;
  text-decoration-color: #007bff;
}

input {
  width: 100%;
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  background-color: #f0f0f0;
}
select{
  width: 100%;
  height: 50px;
  font-size: 20px;
  border-radius: 5px;
  border: solid 2px black;
  box-sizing: border-box;
  background-color: #f0f0f0;
}
.error {
  margin-top: 0;
  color: #b00000;
}


.line{
  width: 100%;
  background-color: #007bff;
  height: 5px;
}
button {
  background-color: #0062cc; /* Button color */
  color: white;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #0056b3; /* Slightly darker on hover */
}


/* Responsive styles */

@media (max-width: 768px) {
  .account-settings-container {
    flex-direction: column;
    align-items: center;
  }

  .settings-form {
    width: 100%; /* Full width on small screens */
  }
}
</style>
