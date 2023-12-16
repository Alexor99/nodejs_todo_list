const { connection } = require('./connectionDB');

async function initializeUsersToken (){

    const query =
        'CREATE TABLE IF NOT EXISTS users_token' +
        '(id INT AUTO_INCREMENT, ' +
        'userId INT,' +
        'token VARCHAR(255),' +
        'create_date DATETIME,' +
        'update_date DATETIME,' +
        'expire_date DATETIME,' +
        'FOREIGN KEY (userId) REFERENCES users(id),' +
        'PRIMARY KEY(id))';

    return new Promise((resolve, reject) => {    
        connection.query(query, function (err, rows) {
            if (err) {
                reject(err);
                console.log('Error occurred', err);
            } else {
                resolve(rows);
                console.log(rows);
            }
        });
    });
};

module.exports = {
    initializeUsersToken,
};
