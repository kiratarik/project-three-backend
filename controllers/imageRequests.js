import Image from '../models/imageModel.js'
import { NotFound } from '../lib/errors.js'

async function getAllImages(_req, res, next){
  try {
    const allImages = await Image.find()
    if (!allImages) throw new Error()
    return res.status(202).json(allImages)
  } catch (err) {
    next(err)
  }
}

async function getImage(req, res, next){
  const { imageId } = req.params
  try {
    const imageGet = await Image.findById(imageId)
    if (!imageGet) throw new NotFound()
    return res.status(200).json(imageGet)
  } catch (err){
    next(err)
  }
}

async function postImage(req, res, next){
  try {
    const imageToPost = await Image.create(req.body)
    if (!imageToPost) throw new Error()
    return res.status(201).json(imageToPost)
  } catch (err) {
    next(err)
  }
}


async function deleteImage(req, res, next){
  const { imageId } = req.params
  try { 
    const imageToDelete = await Image.findById(imageId)
    if (!imageToDelete) throw new NotFound()
    await imageToDelete.remove()
    return res.status(200).json(imageToDelete)
  } catch (err){
    next(err)
  }
}

// * not throwing 422...

async function editImage(req, res, next){
  const { imageId } = req.params
  try {
    const imageToEdit = await Image.findById(imageId)
    if (!imageToEdit) throw new NotFound()
    Object.assign(imageToEdit, req.body)
    await imageToEdit.save()
    res.status(202).json(imageToEdit)
  } catch (err){
    next(err)
  }
}


async function addRating (req, res, next){
  const { imageId } = req.params
  const { currentUser } = req.body
  try { 
    const imageToRate = await Image.findById(imageId)
    if (!imageToRate) throw new Error()

    const createRating = imageToRate.rating.create({ ...req.body, addedBy: currentUser })
    imageToRate.rating.push(createRating)
    await imageToRate.save()
    return res.status(201).json(createRating)
  } catch (err) {
    next(err)
  }
}

async function deleteRating(req, res, next){
  const { imageId, ratingId } = req.params
  const { currentUser } = req
  try {
    const image = await Image.findById(imageId)
    if (!image) throw new Error()

    const rating = await image.rating.id(ratingId)
    if (!rating) throw new Error()

    if (!rating.addedBy.equals(currentUser)) throw new Error()
    rating.remove()
    await image.save()
    return res.sendStatus(204)
  } catch (err){
    next(err)
  }
}



export default {
  show: getImage,
  post: postImage,
  index: getAllImages,
  removeImage: deleteImage,
  edit: editImage,
  postRating: addRating,
  removeRating: deleteRating,  
}