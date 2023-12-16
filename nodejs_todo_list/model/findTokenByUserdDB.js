const { connection } = require('./connectionDB');

async function findTokenByUser(data) {
    return new Promise((resolve, reject) => {
        connection.query(
            // 'SELECT * FROM users_token WHERE userId =' + "'" + data.id + "'",
            'SELECT count(id) as count_tokenId FROM users_token WHERE userId = ' + data.id,
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
    findTokenByUser,
};
