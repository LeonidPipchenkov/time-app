import moment from 'moment'
import { getTimesFromServer, saveTimeOnServer, deleteTimeOnServer } from "./data";

function runCountingTime() {
  setInterval(
    () => {
      this.currentTime = moment().format('HH:mm:ss')
    },
    1000
  )
}

async function getTimes() {
  const timesFromServer = await getTimesFromServer()
  if (timesFromServer.length) {
    this.savedTimes = timesFromServer
  }
}

async function saveTime() {
  const time = this.currentTime
  const info = await saveTimeOnServer(time)
  if (info.insertId) {
    this.savedTimes.unshift(
      {
        id: info.insertId,
        time
      })
    this.$toast.success(
      `Время ${time} сохранено`,
      { position: 'top-right' }
    )
  }
}

async function deleteTime(id) {
  const info = await deleteTimeOnServer(id)
  if (info.affectedRows) {
    this.savedTimes = this.savedTimes.filter((savedTime) => savedTime.id !== id)
    this.$toast.success(
      `Время с ID ${id} удалено`,
      {
        position: 'top-right',
        style: {
          background: '#ff3a00',
          color: '#ffffff'
        }
      })
  }
}

export { runCountingTime, getTimes, saveTime, deleteTime }
