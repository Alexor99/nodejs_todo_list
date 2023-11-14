const { connection } = require('./connection');

function queryFindUserDB(data) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT count(email) as count_email FROM users WHERE email =' +
                "'" +
                data.email +
                "'",
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
    queryFindUserDB,
};
