import mongoose from 'mongoose'
const Schema = mongoose.Schema 

const postSchema = Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    selectedFile: String,
    likeCount:{
        type: Number,
        default: 0
    }
},{timestamps: true})
const PostMessage = mongoose.model('PostMessage', postSchema)

export default PostMessage