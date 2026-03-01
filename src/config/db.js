const { Pool } = require("pg");

const pool = new Pool({
    user: "postgres", // usually postgres
    host: "localhost",
    database: "iips_community",
    password: "user",
    port: 5432,  
});

module.exports = pool;