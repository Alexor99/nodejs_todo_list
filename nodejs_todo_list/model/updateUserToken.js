const { connection } = require('./connection');

function updateUserToken(token, id) {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE users SET token = ' + `${token}` + ' WHERE id = ' + id,
            function (err, rows) {
                if (err) {
                    console.log('Error occurred', err);
                    reject(err);
                } else {
                    console.log(rows);
                    resolve(rows);
                }
            }
        );
    });
}

module.exports = {
    updateUserToken,
};
