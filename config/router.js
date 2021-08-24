import express from 'express'
import Images from '../controllers/imageRequests.js'
import Users from '../controllers/userRequests.js'
import secureRoute from '../lib/secureRoute.js'

const router = express.Router()

router.route('/images')
  .get(Images.index)
  .post(secureRoute, Images.post)

router.route('/images/:imageId')
  .get(Images.show)
  .delete(secureRoute, Images.removeImage)
  .put(secureRoute, Images.edit)

router.route('/images/:imageId/rating')
  .post(secureRoute, Images.postRating)

router.route('/images/:imageId/rating/:ratingId')
  .delete(secureRoute, Images.removeRating) 

router.route('/signUp')
  .post(Users.signUp)

router.route('/signIn')
  .post(Users.logIn)

router.route('/users/:userId')
  .get(Users.show)
  .put(secureRoute, Users.edit)



export default router


