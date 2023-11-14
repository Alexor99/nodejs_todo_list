const { connection } = require('./connection');

function getUserByEmail(data) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT * FROM users WHERE email =' + "'" + data.email + "'",
            function (err, rows) {
                if (err) {
                    console.log('Error occurred', err);
                    reject(err);
                } else {
                    // console.log(rows);
                    resolve(rows);
                }
            }
        );
    });
}

module.exports = {
    getUserByEmail,
};
