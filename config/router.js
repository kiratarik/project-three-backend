import express from 'express'
import Images from '../controllers/imageRequests.js'

const router = express.Router()

router.route('/images')
  .get(Images.index)
  .post(Images.post)



router.route('/images/:imageId')
  .get(Images.show)
  .delete(Images.removeImage)
  .put(Images.edit)


router.route('/signUp')
  .post

router.route('/signIn')
  .get
export default router


