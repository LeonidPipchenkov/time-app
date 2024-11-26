const SERVER_HOST = 'http://localhost:5555'

async function getTimesFromServer() {
  const res = await fetch(`${SERVER_HOST}/times`)
  return res.json()
}

async function saveTimeOnServer(time) {
  const res = await fetch(
    `${SERVER_HOST}/time`,
    {
      method: 'POST',
      headers: { 'Content-Type' : 'application/json' },
      body: JSON.stringify({ time })
    })
  return res.json()
}

async function deleteTimeOnServer(id) {
  const res = await fetch(
    `${SERVER_HOST}/time/${id}`,
    { method: 'DELETE'}
  )
  return res.json()
}

export { getTimesFromServer, saveTimeOnServer, deleteTimeOnServer }
