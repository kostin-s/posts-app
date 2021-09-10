const express = require('express')
const mongoose = require('mongoose')
const config = require('config')
const userRouter = require('./routes/user.routes')
const postsRouter = require('./routes/posts.routes')
const corsMiddleware = require('./middleware/cors.middleware')

const app = express()
const port = process.env.PORT || config.get('port')

app.use(express.json())
app.use(corsMiddleware)

app.use('/api/user', userRouter)
app.use('/api/posts', postsRouter)

const start = async () => {
  try {
    await mongoose
      .connect(config.get('dbUrl'), {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log('MongoDB has started ...'))
    app.listen(port, () => {
      console.log(`Server listening port ${port}`)
    })
  } catch (e) {
    console.log('Server start error', e)
  }
}

start()
