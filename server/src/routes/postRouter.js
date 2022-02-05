import express from 'express'
import { getPosts, createPost } from '../controllers/PostController.js'
import { catchAsync } from '../helpers/catchAsync.js'
const PostRouter = express.Router()

PostRouter.get('/', catchAsync(getPosts))
PostRouter.post('/', catchAsync(createPost))



export default PostRouter