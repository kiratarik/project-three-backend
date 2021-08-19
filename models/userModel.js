import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import mongooseUniqueValidator from 'mongoose-unique-validator'

const userSchema = mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, reequired: true },
  isAdmin: { type: Boolean }, 
})

userSchema
  .virtual('passworConfirmation')
  .set(function(passwordConfirmation){
    this._passwordConfirmation = passwordConfirmation 
  })


userSchema
  .pre('validate', function(next){
    if (this.isModified('password') && this.password !== this._passwordConfirmation){
      this.invalidate('passworConfirmation', 'does not match')
    }
    next()
  })

userSchema
  .pre('save', function(next){
    if (this.isModified('password')){
      this.password = bcrypt.hashSync(this.password, bcrypt.genSaltSync())
    }
    next()
  })

userSchema.methods.validatePassword = function(password) {
  return bcrypt.compareSync(password, this.password)
}

userSchema.plugin(mongooseUniqueValidator)

const User = mongoose.model('user', userSchema)

export default User