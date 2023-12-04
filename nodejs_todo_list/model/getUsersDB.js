const { connection } = require('./connectionDB');

async function getUsersDB() {
    // const query = 'SELECT * FROM users';
    return new Promise((resolve, reject) => {
        connection.query('SELECT * FROM users', (err, rows) => {
            if (err) {
                console.log('Error occurred', err);
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

module.exports = {
    getUsersDB,
}
