import mongoose from 'mongoose'

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  picName: { type: String, required: true, unique: true },
  rating: { type: Number },
  AddedBy: { type: String, required: true },
  tags: { type: Array, required: true },
})

const Image = mongoose.model('image', imageSchema)

export default Image