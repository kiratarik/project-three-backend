import mongoose from 'mongoose'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const tagSchema = new mongoose.Schema({
  types: [{ type: String }],
  locations: [{ type: String }],
  customs: [{ type: String }],
})

const ratingSchema = new mongoose.Schema({
  text: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  addedBy: { type: mongoose.Schema.ObjectId,  ref: 'User', required: true },
})

const imageSchema = new mongoose.Schema({
  url: { type: String, required: true, unique: true },
  picName: { type: String, required: true, unique: true },
  rating: [ratingSchema],
  addedBy: { type: mongoose.Schema.ObjectId, ref: 'User', required: true },
  tags: tagSchema,
  latitude: { type: Number },
  longitude: { type: Number },
})


imageSchema.plugin(mongooseUniqueValidator)

const Image = mongoose.model('image', imageSchema)

export default Image