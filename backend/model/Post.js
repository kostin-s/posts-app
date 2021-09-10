const { Schema, model, ObjectId } = require('mongoose')

const Post = new Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  user: { type: ObjectId, ref: 'User' },
})

module.exports = model('Post', Post)
