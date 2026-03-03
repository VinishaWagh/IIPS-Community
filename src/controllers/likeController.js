const pool = require("../config/db");

// Toggle Likes
exports.toggleLikes = async(req, res)=>{
    try{
        const {postId} = req.params;
        const userId = req.user.id;

        //Check if post exist
        const post = await pool.query(
            "SELECT * FROM posts WHERE id = $1",
            [postId]
        );
        if(post.rows.length === 0){
            return res.status(404).json({message: "Post not found."});
        }

        //Check if already liked
        const existingLike = await pool.query(
            "SELECT * FROM likes WHERE post_id = $1 AND user_id = $2",
            [postId, userId]
        );

        if(existingLike.rows.length > 0){
            //Unlike
            await pool.query(
                "DELETE FROM likes WHERE post_id = $1 AND user_id = $2",
                [postId, userId]
            );

            return res.json({ message: "Post unliked." });
        }

        //Like
        await pool.query(
            "INSERT INTO likes (post_id, user_id) VALUES ($1, $2)",
            [postId, userId]
        );
        return res.json({message: "Post Liked."});
    } catch(error){
        return res.status(500).json({error: error.message});
    }
};