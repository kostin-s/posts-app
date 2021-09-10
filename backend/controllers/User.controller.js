const { validationResult } = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
const User = require('../model/User')
const Post = require('../model/Post')

class UserCounroller {
  async registration(req, res) {
    try {
      const errors = validationResult(req)
      if (!errors.isEmpty()) {
        const msgErrors = errors.errors.map((err) => err.msg)
        return res.status(400).json({ message: msgErrors[0] })
      }

      const { email, password, name, surname } = req.body
      const newUser = await User.findOne({ email })

      if (newUser) {
        return res
          .status(400)
          .json({ message: `Пользователь с email ${email} уже существует.` })
      }
      const hashPassword = await bcrypt.hash(password, 10)

      const user = new User({ email, password: hashPassword, name, surname })
      const startPost = new Post({
        title: 'Первый пост.',
        content:
          'Это Ваш первый пост, который был создан автоматически во время регистрации.',
        user: user._id,
      })
      await user.save()
      await startPost.save()

      return res.status(200).json('Вы успешно зарегистрировались.')
    } catch (e) {
      res
        .status(400)
        .send(
          'В процессе регистрации произошла ошибка. Пожалуйста попробуйте снова.'
        )
    }
  }

  async login(req, res) {
    try {
      const { email, password } = req.body

      const user = await User.findOne({ email })
      if (!user) {
        return res.status(400).json({ message: 'Неверный логин или пароль.' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Неверный логин или пароль.' })
      }

      const token = jwt.sign({ id: user.id }, config.get('jwtKey'), {
        expiresIn: '1h',
      })

      return res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          surname: user.surname,
        },
      })
    } catch (e) {
      res
        .status(400)
        .send(
          'В процессе авторизации произошла ошибка. Пожалуйста попробуйте снова.',
          e
        )
    }
  }

  async auth(req, res) {
    try {
      const user = await User.findOne({ _id: req.user.id })

      const token = jwt.sign({ id: user.id }, config.get('jwtKey'), {
        expiresIn: '1h',
      })
      return res.json({
        token,
        user: {
          id: user._id,
          email: user.email,
          name: user.name,
          surname: user.surname,
        },
      })
    } catch (e) {
      res.send(
        'В процессе авторизации произошла ошибка. Пожалуйста попробуйте снова.',
        e
      )
    }
  }
}

module.exports = new UserCounroller()
