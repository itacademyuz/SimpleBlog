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