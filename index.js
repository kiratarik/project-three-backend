import express from 'express'
import router from './config/router.js'
import { connectDb } from './db/helper.js'
import { port } from './config/configData.js'
import logger from './lib/logger.js'
import errorHandler from './lib/errorHandler.js'

const app = express()

app.use(express.json())
app.use('/', logger)
app.use(router)
app.use(errorHandler)

async function startServer() {
  try {
    await connectDb()
    console.log('Database connected')
    app.listen(port, ()=> console.log(`The server is running on ${port}`))
  } catch (err) {
    console.log('There was a problem connecting to the database')
    console.log(err)
  }
}

startServer()





