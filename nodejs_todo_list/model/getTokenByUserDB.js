const { connection } = require('./connectionDB');

async function getTokenByUser(userId) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT token from users_token WHERE userId =' + "'" + userId + "'",
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
    getTokenByUser,
};
