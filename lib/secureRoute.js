import jwt from 'jsonwebtoken'
import { secret } from '../config/configData.js'
import User from '../models/userModel.js'


export default async function SecureRoute(req, _res, next) {
  try {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('bearer')) {
      throw new Error()
    }
    const token = req.headers.authorization.replace('Bearer ', '')
    const payload = jwt.verify(token, secret)
    const user = await User.findById(payload.sub)

    if (!user) throw new Error()

    req.currentUser = user
    req.currentUserId = user._id
      
    next()
  } catch (err){
    console.log(err)
  }
}