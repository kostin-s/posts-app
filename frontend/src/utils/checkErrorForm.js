export function checkErrorForm(array) {
  const errors = []
  array.forEach((item) => {
    let value = checkError(item)
    if (value) {
      errors.push(value)
    }
  })
  return errors
}

function checkError(item) {
  switch (item.type) {
    case 'email':
      const checkEmail =
        /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/
      return checkEmail.test(item.value) ? false : 'Некорректный email!'
    case 'password':
      const checkPassword = /(?=.*[a-z])(?=.*[A-Z]).{3,}/
      return checkPassword.test(item.value)
        ? false
        : 'Некорректный пароль! Пароль должен содержать не менее 1 буквы в верхнем регистре и 1 буквы в нижнем регистре. Пароль должен быть длиннее 3 символов. Пример пароля: qweQWE'
    case 'field':
      return item.value.trim() ? false : 'Поле не может быть пустым.'
    default:
      return false
  }
}
