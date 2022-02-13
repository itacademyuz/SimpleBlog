import express from 'express'
import { getPosts, createPost, updatePost, deletePost, likePost } from '../controllers/PostController.js'
import { catchAsync } from '../helpers/catchAsync.js'
import auth from '../middlewares/autharizator.js'
const PostRouter = express.Router()

PostRouter.get('/', catchAsync(getPosts))
PostRouter.post('/', auth, catchAsync(createPost))
PostRouter.patch('/:id', auth, catchAsync(updatePost))
PostRouter.delete('/:id', auth, catchAsync(deletePost))
PostRouter.patch('/:id/likePost', auth, catchAsync(likePost))

export default PostRouter