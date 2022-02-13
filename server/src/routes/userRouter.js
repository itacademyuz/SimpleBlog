import express from 'express'
import { signin, signup } from '../controllers/UserController.js'
import { catchAsync } from '../helpers/catchAsync.js'
const UserRouter = express.Router()

UserRouter.post('/signin', catchAsync(signin))
UserRouter.post('/signup', catchAsync(signup))
export default UserRouter