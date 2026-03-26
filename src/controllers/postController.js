const pool = require("../config/db");

// Create a Post
exports.createPost = async(req, res)=>{
    try{
        const {content} = req.body;
        if(!content){
            res.status(400).json({message: "Content is required!"});
        }   

        const newPost = await pool.query(
            "INSERT INTO posts (user_id, content) VALUES ($1, $2) RETURNING *",
            [req.user.id, content]
        );

        res.status(201).json(newPost.rows[0]);
    } catch(error){
        res.status(500).json({error: error.message});
    }
};

// Get posts (Commnuity Feed)
exports.getPosts = async(req, res)=>{
    try{
        const userId = req.user.id;
        const posts = await pool.query(
        `SELECT posts.id, posts.content, posts.created_at, users.name,
        COUNT (DISTINCT likes.id) AS likes_count,
        COUNT (DISTINCT comments.id) AS comments_count,
        BOOL_OR(likes.user_id = $1) AS is_liked
         FROM posts
         JOIN users ON posts.user_id = users.id
         LEFT JOIN likes ON posts.id = likes.post_id
         LEFT JOIN comments ON posts.id = comments.post_id
         GROUP BY posts.id, users.name
         ORDER BY posts.created_at DESC`,
         [userId]
        );

        res.json(posts.rows);
    }
    catch(error){
        res.status(500).json({error: error.message});
    }
};


// Delete Posts (Only by Owner)
exports.deletePosts = async(req, res)=>{
    try{
        const postId = req.params.id;

        //if post exists
        const post = await pool.query(
            `SELECT * FROM posts WHERE id = $1`,
            [postId]
        );

        if(post.rows.length === 0){
            return res.status(404).json({message: "Post not found."});
        }

        //check ownership
        if(post.rows[0].user_id !== req.user.id){
            return res.status(403).json({message: "You are not authorized to delete this post."});
        }

        await pool.query(
            "DELETE FROM posts WHERE id = $1",
            [postId]
        );

        res.json({message: "Post deleted successfully."});
    } catch(error){
        res.status(500).json({error: error.message});
    }
};

// Update Post (Only By Owner)
exports.updatePosts = async(req, res)=>{
    try{
        const postId = req.params.id;
        const {content} = req.body;

        if(!content){
            return res.status(400).json({message: "Content is required."});
        }

        //check if post exists
        const post = await pool.query(
            `SELECT * FROM posts WHERE id = $1`,
            [postId]
        );

        if(post.rows.length === 0){
            return res.status(404).json({message: "Post not found."});
        }

        //check ownership
        if(post.rows[0].user_id !== req.user.id){
            return res.status(403).json({message: "You are not authorized to delete this post."});
        }

        //update post
        const updatedPost = await pool.query(
            "UPDATE posts SET content = $1 WHERE id = $2 RETURNING *",
            [content, postId]
        );

        res.json(updatedPost.rows[0]);
    } catch(error){
        return res.status(500).json({error: error.message});
    }
};

// get Trending Posts

exports.getTrending = async (req, res) => {
  try {
    const trending = await pool.query(
      `SELECT posts.id, posts.content, users.name,
       COUNT(likes.id) AS likes_count
       FROM posts
       JOIN users ON posts.user_id = users.id
       LEFT JOIN likes ON posts.id = likes.post_id
       GROUP BY posts.id, users.name
       ORDER BY likes_count DESC
       LIMIT 5`
    );
    res.json(trending.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};