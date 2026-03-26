const pool = require("../config/db");

// getting user profile
exports.getProfile = async(req, res)=>{
    try{
        const user = await pool.query(
            "SELECT id, name, email, role, created_at FROM users WHERE id = $1",
            [req.user.id]
        );
        if(user.rows.length == 0){
            return res.status(404).json({message: "User not found"});
        }
        res.json(user.rows[0]);
    } catch(error){
        res.status(500).json({error: error.message});
    }
};

// getting suggestions
exports.getSuggestions = async (req, res) =>{
    try{
        const currentUserId = req.user.id;

        const users = await pool.query(
            "SELECT id, name, role FROM users WHERE id != $1 LIMIT 5", [currentUserId]
        );

        res.json(users.rows);
    } catch(error){
        res.status(500).json({error: error.message});
    }
};