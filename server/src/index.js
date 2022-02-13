import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import bodyParser from 'body-parser'
import './db/config.js'
import PostRouter from './routes/postRouter.js'
import UserRouter from './routes/userRouter.js'
const app = express()
const port = process.env.PORT
app.use(bodyParser.json({limit: "30mb", extended: true}))
app.use(bodyParser.urlencoded({limit: "30mb", extended: true}))
app.use(cors())
app.use('/posts', PostRouter)
app.use('/users', UserRouter)
app.listen(port, ()=>{
    console.log('App is running on port ' + port);
}) 