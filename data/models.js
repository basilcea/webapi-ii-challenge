const posts = require("./db");

const getAllPosts = async (req, res) => {
  try {
    const data = await posts.find();
    return res.status(200).json({
      status: 200,
      data
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: "The posts information could not be retrieved."
    });
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await posts.findById(id);
    if (!data) {
      return res.status(404).json({
        status: 404,
        message: "The post with the specified ID does not exist."
      });
    }
    return res.status(200).json({
      status: 200,
      data
    });
  } catch (err) {
    return res.status(500).json({
      status: 500,
      error: "The post information could not be retrieved."
    });
  }
};

const deletePost = async (req, res) => {
    const {id} = req.params
    try {
        const data = await posts.remove(id);
        if (!data) {
          return res.status(404).json({
            status: 404,
            message: "The post with the specified ID does not exist."
          });
        }
        return res.status(200).json({
          status: 200,
          message:'Deleted successfully'
        });
      } catch (err) {
        return res.status(500).json({
          status: 500,
          error: "The post could not be removed"
        });
      }

};
const createPost = async (req, res) => {};
const createComment = async (req, res) => {};

const getPostComments = async (req, res) => {};
const editPost = async (req, res) => {};


module.exports = {
  createPost,
  createComment,
  getAllPosts,
  getPost,
  getPostComments,
  editPost,
  deletePost
};
