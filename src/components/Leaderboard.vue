<template>
  <div class="leaderboard">
        <div class="exit" @click="exit"><img src="../assets/arrow-right-circle.svg" alt="Return"></div>
        <h2>Liderlik Tablosu</h2>
        <ul>
          <li class="flex user" v-for="leader in leaders" v-bind:key="leader" v-bind:leader="leader">
            <span class="rank flex">{{ leaders.indexOf(leader) + 1}}</span>
            <span class="username">{{ leader.username }}</span>
            <span class="click">Tıklama: {{ leader.click }}</span>
          </li>
        </ul>
  </div>
</template>

<script>

export default {
  name: 'Leaderboard',
  props: {
    toggleLeaderboard: Function,
    exit: Function,
    // username: String,
    // click: Number,
    leaders: Array
  }
}
</script>
