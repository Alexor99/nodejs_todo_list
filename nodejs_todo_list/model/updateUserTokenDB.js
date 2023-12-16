const { connection } = require('./connectionDB');

async function updateUserToken(data, id) {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE users_token SET? WHERE userId =' + `${id}`,
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
    updateUserToken,
};
