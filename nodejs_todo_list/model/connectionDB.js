const mysql = require('mysql');
require('dotenv').config();

    const connection = mysql.createConnection({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
    });
    
    connection.connect((error)=> {
        if (error instanceof Error) {
            if (error.code === "PROTOCOL_CONNECTION_LOST") {
                console.error(error.stack);
                console.log("Lost connection. Reconnecting...");

                connection.connect()
    
            } else if (error.fatal) {
                throw error;
            }
        }
    })


module.exports = {
    connection,
};


