import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/configData.js'

async function getUserProfile( req, res ) {
  try {
    const userProfile = await User.findOne({ email: req.body.email })
    if (!userProfile) throw new Error()
    return res.status(200).json({
      id: `${userProfile._id}`,
      userName: `${userProfile.username}`,
      collections: `${userProfile.myCollections}`,
      following: `${userProfile.myFollows}`,
    })
  } catch (err) {
    console.log(err)
  }
}

async function createUserProfile( req, res ){
  try {
    const createProfile = await User.create(req.body)
    if (!createProfile) throw new Error()
    return res.status(200).json({
      message: `welcome ${createProfile.username}` })
  } catch (err) {
    console.log(err)
  }
}  


async function accessUserProfile( req, res){
  try {
    const userProfile = await User.findOne({ email: req.body.email })          
    if (!userProfile || !userProfile.validatePassword(req.body.password)) throw new Error()

    const token = jwt.sign({ sub: userProfile._id }, secret, { expiresIn: '1 day' })

    return res.status(202).json({
      message: `welcome back ${userProfile.username}`,
      token,
    })
  } catch (err) {
    console.log(err)
  }
}



export default {
  show: getUserProfile,
  logIn: accessUserProfile,
  signUp: createUserProfile,
}