<template>
  <ul class="menu flex">
    <li class="flex">
      <a href="https://github.com/orhanemree"><img src="../assets/github.svg" alt="GitHub"></a>
    </li>
    <li class="flex">{{ username }}</li>
    <li class="flex login" @click="toggleLogin">{{ status }}</li>
    <li class="flex crown" @click="toggleLeaderboard">
      <img src="../assets/crown.svg" alt="Crown">
    </li>
  </ul>
</template>

<script>

export default {
  name: 'Menu',
  props: {
    username: String,
    toggleLogin: Function,
    status: String,
    toggleLeaderboard: Function
  }
}
</script>
