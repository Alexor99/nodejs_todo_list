const { connection } = require('./connectionDB');

async function updateUserToken(token, id) {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE users SET token = ' + `${token}` + ' WHERE id = ' + id,
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
    updateUserToken,
};
