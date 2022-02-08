import * as api from '../api'
import { CREATE, READ, UPDATE, DELETE, LIKE } from '../constants/actionTypes'

//Action Creators
export const getPosts =()=> async(dispatch)=>{
    try {
        const { data } = await api.fetchPosts()
        dispatch({type: READ, payload: data})
    } catch (error) {
        console.log(error);
    }
    
}
export const createPost = (post) => async(dispatch)=>{
    try {
        const {data} = await api.createPost(post)
        dispatch({type: CREATE, payload: data})
    } catch (e) {
        console.log(e);
    }
}
export const updatePost = (id, post)=>async(dispatch)=>{
    try {
       const {data} = await api.updatePost(id, post)
       console.log(data);
       dispatch({type: UPDATE, payload: data})
    } catch (e) {
        console.log(e);
    }
}
export const deletePost = (id)=>async(dispatch)=>{
    try {
        await api.deletePost(id)
        dispatch({type: DELETE, payload: id})
    } catch (e) {
        console.log(e);
    }
}
export const likePost = (id)=>async(dispatch)=>{
    try {
        const {data} = await api.likePost(id)
        dispatch({type: LIKE, payload: data})
    } catch (e) {
        console.log(e);
    }
}