const Post = require('../model/Post')

class PostController {
  async getPosts(req, res) {
    try {
      const posts = await Post.find({ user: req.user.id })
      return res.json(posts)
    } catch (e) {
      return res.status(500).json({ message: 'Посты не найдены.' })
    }
  }

  async createPost(req, res) {
    try {
      const { title, content } = req.body

      const newPost = new Post({
        title,
        content,
        user: req.user.id,
      })

      await newPost.save()

      const post = { _id: newPost._id, title, content }
      return res.json(post)
    } catch (e) {
      return res.status(500).json({ message: 'Посты не найдены.' })
    }
  }

  async updatePost(req, res) {
    try {
      const newPost = req.body.post

      const post = await Post.findOne({ _id: newPost._id, user: req.user.id })
      if (!post) {
        return res.status(400).json({ message: 'Пост не найден.' })
      }
      const upPost = await Post.updateOne(post, newPost)
      return res.json({ upPost })
    } catch (e) {
      res.status(500).json({ message: 'Ошибка. Пост не был обновлен.' })
    }
  }

  async removePost(req, res) {
    try {
      const post = await Post.findOne({ _id: req.query.id, user: req.user.id })
      if (!post) {
        return res.status(400).json({ message: 'Пост не найден.' })
      }
      await post.remove()
      return res.json({ message: 'Пост был успешно удален.' })
    } catch (e) {
      return res.status(500).json({ message: 'Пост не найден.' })
    }
  }
}

module.exports = new PostController()
