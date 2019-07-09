const posts = require("./db");
const status404 = res => {
  return res.status(404).json({
    status: 404,
    message: "The post with the specified ID does not exist."
  });
};

const status200 = (res, data, message) => {
  return res.status(200).json({
    status: 200,
    data,
    message
  });
};
const status500 = (res, error) => {
  return res.status(500).json({
    status: 500,
    error
  });
};
const status201 = (res, data, message) => {
  return res.status(201).json({
    status: 201,
    data,
    message
  });
};
const status400 = (res, errorMessage) => {
  return res.status(400).json({
    status: 400,
    errorMessage: "Please provide title and contents for the post."
  });
};
const getAllPosts = async (req, res) => {
  try {
    const data = await posts.find();
    status200(res, data, "");
  } catch (err) {
    status500(res, "The posts information could not be retrieved.");
  }
};

const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await posts.findById(id);
    data.length === 0 ? status404(res) : status200(res, data);
  } catch (err) {
    status500(res, "The posts information could not be retrieved.");
  }
};

const deletePost = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await posts.remove(id);
    console.log(data.length);
    !data ? status404(res) : status200(res, "", "Deleted Successfully");
  } catch (err) {
    status500(res, "The post could not be removed");
  }
};

const getPostComments = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await posts.findById(id);
    const comments = await posts.findPostComments(id);
    data.length === 0 ? status404(res) : status200(res, comments, "");
  } catch (err) {
    status500(res, "The comments information could not be retrieved.");
  }
};
const createPost = async (req, res) => {
  try {
    const { title, contents } = req.body;
    if (!title || !contents) {
      status400(res, "Please provide title and contents for the post.");
    }
    const data = await posts.insert({ title, contents });
    const newPost = await posts.findById(data.id);
    status201(res, newPost, "");
  } catch (err) {
    status500(res, "There was an error while saving the post to the database");
  }
};
const createComment = async (req, res) => {
  const { id } = req.params;
  const { text } = req.body;
  try {
    const data = await posts.findById(id);
    data.length === 0 && status404(res);
    if (!text) {
      status400(res, "Please provide text for the comment.");
    }
    const addComment = await posts.insertComment({ text, post_id: id });
    addComment.id = req.query;
    const response = await posts.findPostComments(id);
    status201(res, response, "");
  } catch (err) {
    status500(
      res,
      "There was an error while saving the comment to the database"
    );
  }
};
const editPost = async (req, res) => {
  const { id } = req.params;
  try {
    const { title, contents } = req.body;
    if (!title || !contents) {
      status400(res, "Please provide title and contents for the post.");
    }
    const data = await posts.update(id, { title, contents });
    if (data.length === 0) {
      status404(res);
    }
    const newPost = await posts.findById(id);
    status200(res, newPost, "");
  } catch (err) {
    status500(res, "The post information could not be modified.");
  }
};

module.exports = {
  createPost,
  createComment,
  getAllPosts,
  getPost,
  getPostComments,
  editPost,
  deletePost
};
