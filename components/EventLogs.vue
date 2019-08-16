<template>
  <div class="event-dispatcher" v-if="showLogs">
    <p v-for="event in log" :key="event.name">{{event}}</p>
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data() {
    return {
      showLogs: false
    }
  },
  computed: {
    ...mapState('events', ['log'])
  }
}
</script>

<style lang="scss" scoped>
.event-dispatcher {
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  width: 100%;
  p {
    font-family: monospace;
    margin-bottom: 2rem;
  }
  z-index: 9999;
  padding: 4rem;
  background: white;
  word-wrap: break-word;
  overflow: scroll;
  height: 20rem;
}
</style>