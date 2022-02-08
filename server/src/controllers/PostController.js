import PostMessage from "../models/PostMessage.js"

export const getPosts = async(req, res)=>{
    const posts = await PostMessage.find({})
    if(!posts){
        return res.status(404).send('NOT FOUND')
    }
    res.status(200).json(posts)
}
export const createPost = async(req, res)=>{
    const post = req.body
    const newPost = new PostMessage(post)
    if(!newPost){
        return res.status(409).json('Cannot create it')
    }
    await PostMessage.create(newPost)
    res.status(201).json(newPost)
}
export const updatePost = async(req, res)=>{
    const {id} = req.params
    const post = req.body
    const editedPost = await PostMessage.findByIdAndUpdate(id, post, {new: true})
    res.json(editedPost)
}
export const deletePost = async(req, res)=>{
    const {id} = req.params
    const deletedPost = await PostMessage.findByIdAndDelete(id)
    const message = deletedPost? 'success':'error'
    res.json({message})
}
export const likePost = async(req, res)=>{
    const {id} = req.params
    const post = await PostMessage.findById(id)
    const {likeCount} = post
    const updatedPost = await PostMessage.findOneAndUpdate(id, {likeCount: likeCount+1}, {new: true})
    res.json(updatedPost)
}