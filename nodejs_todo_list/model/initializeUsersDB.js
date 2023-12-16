const { connection } = require('./connectionDB');

async function initializeUsers (){

    const query =
        'CREATE TABLE IF NOT EXISTS users' +
        '(id INT AUTO_INCREMENT, ' +
        'email VARCHAR(255), ' +
        'password VARCHAR(255), ' +
        'create_date DATETIME, ' +
        'update_date DATETIME, ' +
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
    initializeUsers,
};
