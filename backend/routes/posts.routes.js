const Router = require('express')
const router = new Router()
const postController = require('../controllers/Post.controller')
const auth = require('../middleware/auth.middleware')

router.get('', auth, postController.getPosts)
router.post('/create', auth, postController.createPost)
router.put('/update', auth, postController.updatePost)
router.delete('/remove', auth, postController.removePost)

module.exports = router
