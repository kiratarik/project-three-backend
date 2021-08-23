import faker from 'faker'

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

    const adminUser = await User.create({
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
      image.addedBy = adminUser  
    })

    console.log('Admin user is added by')

    const users = []

    for (let index = 0; index < 50; index++) {
      const username = faker.internet.userName()
      const firstName = faker.name.firstName()
      const email = `${firstName}@email.com`
      users.push({
        username,
        email,
        isAdmin: false,
        myCollections: [],
        myFollows: [],
        password: 'pass',
        passwordConfirmation: 'pass',
      })
    }

    const createdUsers = await User.create(users)
    
    const image = await Image.create(imageData)

    console.log(`Number of images added: ${image.length},
                Image info: ${image}
                Admin user: ${adminUser}
                Users added: ${createdUsers.length}`)

  } catch (error) {
    console.log('Something went wrong')
    console.log(error)
  }

  await disconnectDb()
  console.log('💾 Database disconnected')


}

seed()