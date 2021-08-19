import express from 'express'
import Images from '../controllers/imageRequests.js'

const router = express.Router()

router.route('/images')
  .get(Images.index)
  .post(Images.post)



router.route('/images/:imageId')
  .get(Images.show)
  .delete(Images.delete)

export default router


