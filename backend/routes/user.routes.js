const Router = require('express')
const router = new Router()
const userController = require('../controllers/User.controller')
const auth = require('../middleware/auth.middleware')
const checkRegistration = require('../middleware/check.registration')

router.post('/registration', checkRegistration(), userController.registration)
router.post('/login', userController.login)
router.get('/auth', auth, userController.auth)

module.exports = router
