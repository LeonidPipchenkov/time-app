import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { getTimes, saveTime, deleteTime } from './timeService.mjs'

const PORT = 5000

const app = express()
app.use(bodyParser.json())
app.use(cors())

app.get(
  '/',
  (_, res) => res.send('Hello from the time saving service!')
)

app.get(
  '/times',
  async (_, res) => res.send(await getTimes())
)

app.post(
  '/time',
  async (req, res) => res.send(await saveTime(req.body.time))
)

app.delete(
  '/time/:id',
  async (req, res) => res.send(await deleteTime(req.params.id))
)

app.listen(
  PORT,
  () => console.log(`Express web server is running on port ${PORT}`)
)
