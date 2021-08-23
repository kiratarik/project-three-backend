import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/configData.js'
import { Unauthorized } from '../lib/errors.js'

async function getUserProfile( req, res, next ) {
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
    next(err)
  }
}

async function createUserProfile( req, res, next ){
  try {
    const createProfile = await User.create(req.body)
    if (!createProfile) throw new Error()
    return res.status(200).json({
      message: `welcome ${createProfile.username}` })
  } catch (err) {
    next(err)
  }
}  


async function accessUserProfile( req, res, next){
  try {
    const userProfile = await User.findOne({ email: req.body.email })          
    if (!userProfile || !userProfile.validatePassword(req.body.password)) throw new Unauthorized()

    const token = jwt.sign({ sub: userProfile._id }, secret, { expiresIn: '1 day' })

    return res.status(202).json({
      message: `welcome back ${userProfile.username}`,
      token,
    })
  } catch (err) {
    next(err)
  }
}



export default {
  show: getUserProfile,
  logIn: accessUserProfile,
  signUp: createUserProfile,
}