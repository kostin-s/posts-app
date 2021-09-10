const { check } = require('express-validator')

const checkregistration = () => {
  return [
    check('email', 'Некорректный email').trim().isEmail(),
    check(
      'password',
      'Некорректный пароль! Пароль должен содержать не менее 1 буквы в верхнем регистре и 1 буквы в нижнем регистре. Пароль должен быть длиннее 3 символов. '
    ).matches(/(?=.*[a-z])(?=.*[A-Z]).{3,}/),
    check('name').isLength({ min: 1 }),
    check('surname').isLength({ min: 1 }),
  ]
}

module.exports = checkregistration
