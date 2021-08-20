import Image from '../models/imageModel.js'

async function getAllImages(req, res){
  try {
    const allImages = await Image.find()
    if (!allImages) throw new Error()
    return res.status(202).json(allImages)
  } catch (err) {
    console.log(err)
  }
}


async function getImage(req, res){
  const { imageId } = req.params
  try {
    const imageGet = await Image.findById(imageId)
    if (!imageGet) throw new Error()
    return res.status(200).json(imageGet)
  } catch (err){
    console.log(err)
  }
}

async function postImage(req, res){
  try {
    const imageToPost = await Image.create(req.body)
    if (!imageToPost) throw new Error()
    return res.status(201).json(imageToPost)
  } catch (err) {
    console.log(err)
  }
}


async function deleteImage(req, res){
  const { imageId } = req.params
  try { 
    const imageToDelete = await Image.findById(imageId)
    if (!imageToDelete) throw new Error()
    await imageToDelete.remove()
    return res.status(200).json(imageToDelete)
  } catch (err){
    console.log(err)
  }
}

async function editImage(req, res){
  const { imageId } = req.params
  try {
    const imageToEdit = await Image.findById(imageId)
    if (!imageToEdit) throw new Error()
    Object.assign(imageToEdit, req.body)
    await imageToEdit.save()
    res.status(202).json(imageToEdit)
  } catch (err){
    console.log(err)
  }
}

export default {
  show: getImage,
  post: postImage,
  index: getAllImages,
  removeImage: deleteImage,
  edit: editImage,
}