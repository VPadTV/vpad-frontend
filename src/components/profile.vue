<template>
    <div class="profile-info">
      <div class="user-banner">
        <img class="user-banner-image" :src="user.banner" alt="User Banner">
      </div>
  
      <div class="profile-avatar">
        <img src="UserProfilePicture.vue" alt="User avatar">
      </div>
  
      <div class="profile-name">
        <h2>{{user.name}}</h2>
      </div>
    </div>
  </template>
  
  <script setup>
  const user = {
    name: "John Doe",
    banner: "https://example.com/user-banner.jpg",
  };
  </script>
  
  <style scoped>
  .profile-info {
    display: flex;
    flex-direction: column;
  }
  
  @media (min-width: 768px) {
    .profile-info {
      flex-direction: row;
    }
  
    .user-banner {
      width: 350px;
    }
  }
  
  .user-banner {
    background-color: #f2f2f2;
    padding: 20px;
    border-radius: 10px;
    margin-bottom: 20px;
  }
  
  .user-banner-image {
    width: 100%;
    height: auto;
  }
  
  .profile-avatar {
    margin-left: 20px;
  }
  
  .profile-avatar img {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    margin: 0 10px;
  }
  
  .profile-name {
    text-align: center;
  }
  </style>