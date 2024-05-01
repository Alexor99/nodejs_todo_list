const { connection } = require('./connectionDB');

async function updateUser(data, id) {
    return new Promise((resolve, reject) => {
        connection.query(
            'UPDATE users SET? WHERE id =' + `${id}`,
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
    updateUser,
};
