import Image from '../models/imageModel.js'
import User from '../models/userModel.js'
import { connectDb, truncateDb, disconnectDb } from '../db/helper.js'
import imageData from './data/images.js'

async function seed(){

  console.log('Run seed')
  try {
    await connectDb()
    console.log('💾 Database connected')
    await truncateDb()
    console.log('💾 Database dropped')

    const user = await User.create({
      username: 'Admin',
      email: 'admin@mail.com',
      password: 'pass',
      passwordConfirmation: 'pass',
      isAdmin: true,
      myCollections: [],
      myFollows: [],
    })

    console.log('💾 Admin created')

    imageData.forEach(image => {
      image.addedBy = user
    })

    const image = await Image.create(imageData)

    console.log(`Number of images added: ${image.length},
                Image info: ${image}`)

  } catch (error) {
    console.log('Something went wrong')
    console.log(error)
  }

  await disconnectDb()
  console.log('💾 Database disconnected')


}

seed()