import User from '../models/userModel.js'
import jwt from 'jsonwebtoken'
import { secret } from '../config/configData.js'
import { Unauthorized } from '../lib/errors.js'

async function getUserProfile( req, res, next ) {
  try {
    const { userId } = req.params
    const userProfile = await User.findById(userId)
    if (!userProfile) throw new Error()
    return res.status(200).json({
      _id: `${userProfile._id}`,
      username: `${userProfile.username}`,
      myCollections: userProfile.myCollections,
      myFollowing: userProfile.myFollows,
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
      message: `Welcome back ${userProfile.username}`,
      token,
    })
  } catch (err) {
    next(err)
  }
}

async function editUserProfile( req, res, next){
  try {
    const { userId } = req.params
    const userProfileToEdit = await User.findById(userId) 
    if (!userProfileToEdit) throw new Unauthorized()
    Object.assign(userProfileToEdit, req.body)
    await userProfileToEdit.save()
    res.status(201).json(userProfileToEdit)
  } catch (err) {
    next(err)
  }

}


export default {
  show: getUserProfile,
  logIn: accessUserProfile,
  signUp: createUserProfile,
  edit: editUserProfile,
}