import express from 'express'
import Images from '../controllers/imageRequests.js'
import Users from '../controllers/userRequests.js'

const router = express.Router()

router.route('/images')
  .get(Images.index)
  .post(Images.post)



router.route('/images/:imageId')
  .get(Images.show)
  .delete(Images.removeImage)
  .put(Images.edit)

router.route('/images/:imageId/rating')
  .post(Images.postRating)

router.route('/images/:imageId/rating/:ratingId')
  .delete(Images.removeRating) 

router.route('/signUp')
  .post(Users.signUp)

router.route('/signIn')
  .post(Users.logIn)

router.route('/user')
  .post(Users.show)

export default router


