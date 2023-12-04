const { connection } = require('./connectionDB');

async function queryFindUserDB(data) {
    return new Promise((resolve, reject) => {
        connection.query(
            'SELECT count(email) as count_email FROM users WHERE email =' +
                "'" +
                data.email +
                "'",
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
    queryFindUserDB,
};
