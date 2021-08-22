import express from 'express'
import router from './config/router.js'
import { connectDb } from './db/helper.js'
import { port } from './config/configData.js'
import logger from './lib/logger.js'

const app = express()

app.use(express.json())
app.use('/', logger)
app.use(router)

async function startServer() {
  try {
    await connectDb()
    console.log('database connected')
    app.listen(port, ()=> console.log(`the server is running on ${port}`))
  } catch (err) {
    console.log('there was a problem connecting to the database')
    console.log(err)
  }
}

startServer()





