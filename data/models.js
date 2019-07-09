const posts = require('./db');

const getAllPosts  = async (req,res) => {
    try{
        const data = await posts.find()
        return res.status(200).json({
            status:200,
            data
        })
    }catch(err){
        return res.status(500).json({
            status:500,
            error: "The posts information could not be retrieved." 
        })
    }
} 
const createPost = async (req,res) => {

}  
const createComment  = async (req,res) => {}  
const getPost  = async (req,res) => {}  
const getPostComments = async (req,res) => {}  
const editPost = async (req,res) => {}  
const deletePost = async (req,res) => {}  

module.exports ={createPost , createComment , getAllPosts , getPost , getPostComments , editPost , deletePost}