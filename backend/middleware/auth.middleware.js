const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next) => {
  if (req.method === 'OPTIONS') next()

  try {
    const token = req.headers.authorization.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Auth token error' })
    }

    const decoded = jwt.verify(token, config.get('jwtKey'))
    req.user = decoded

    next()
  } catch (e) {
    return res.status(401).json({ message: 'Auth error' })
  }
}

module.exports = auth
