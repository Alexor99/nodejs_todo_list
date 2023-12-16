const { connection } = require('./connectionDB');

async function createUserToken(data) {
    return new Promise((resolve, reject) => {
        connection.query(
            'INSERT INTO users_token SET?',
            data,
            function (err, rows) {
                if (err) {
                    reject(err);
                    console.log('Error occurred', err);
                } else {
                    resolve(rows);
                    console.log(rows);
                }
            }
        );
    });
}

module.exports = {
    createUserToken,
};