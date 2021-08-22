import express from 'express'
import mongoose from 'mongoose'
import router from './config/router.js'

import { dbURI } from './config/configData.js'
import { port } from './config/configData.js'


const app = express()
app.use(express.json())

function connectDb() {
  return mongoose.connect(dbURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
}

async function listenPort() {
  try {
    await connectDb()
    console.log('databse connected')
    app.listen(port, ()=> console.log(`the server is running on ${port}`))
  } catch (err) {
    console.log('there was a problem connecting to the database')
    console.log(err)
  }
}

listenPort()





app.use(express.json())

app.use('/', (req, res, next) => {
  console.log(`there is a ${req.method} request from ${req.url}`)
  next()
})

app.use(router)


