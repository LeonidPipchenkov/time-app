<template>
  <div class="main">
    <h1 class="current-time">{{ currentTime }}</h1>

    <h3>Нажмите кнопку для сохранения времени</h3>
    <button class="btn-save" @click="saveTime">Сохранить время</button>

    <h3 v-if="showSavedTimes && savedTimes.length">Ранее сохраненные времена:</h3>
    <div
      v-if="showSavedTimes"
      class="saved-times"
      v-for="savedTime in savedTimes"
      :key="savedTime.id"
    >
      <div class="saved-time">{{ savedTime.time }}</div>
      <button class="btn-delete" @click="deleteTime(savedTime.id)">Удалить</button>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import { runCountingTime, getTimes, saveTime, deleteTime } from '@/utils/service'

export default {
  props: {
    showSavedTimes: Boolean
  },
  data() {
    return {
      currentTime: moment().format('HH:mm:ss'),
      savedTimes: []
    }
  },
  methods: {
    runCountingTime,
    getTimes,
    saveTime,
    deleteTime
  },
  created() {
    this.runCountingTime()
    this.getTimes()
  }
}
</script>

<style scoped>
h1 {
  font-size: 4rem;
  font-weight: 500;
  top: -10px;
}

h3 {
  font-size: 2rem;
}

button {
  border-radius: 5px;
  border: none;
  cursor: pointer;
}

button:active {
  transform: translateY(4px);
}

.main {
  text-align: center;
}

.current-time {
  color: var(--color-green-light);
}

.btn-save {
  font-size: 1.5rem;
  margin: 30px;
  padding: 10px;
  background-color: var(--color-blue-light);
}

.saved-times {
  font-size: 1.7rem;
}

.saved-time {
  width: 150px;
  display: inline-block;
}

.btn-delete {
  font-size: 1rem;
  margin: 10px;
  padding: 4px;
  vertical-align: top;
  background-color: var(--color-red-light);
}
</style>
