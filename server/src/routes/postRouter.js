import express from 'express'
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/PostController.js'
import { catchAsync } from '../helpers/catchAsync.js'
const PostRouter = express.Router()

PostRouter.get('/', catchAsync(getPosts))
PostRouter.post('/', catchAsync(createPost))
PostRouter.patch('/:id', catchAsync(updatePost))
PostRouter.delete('/:id', catchAsync(deletePost))
PostRouter.patch('/:id/likePost', catchAsync(likePost))
export default PostRouter