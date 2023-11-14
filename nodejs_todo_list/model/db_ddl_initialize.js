const { connection } = require('./connection');

const initializeDB = () => {
    connection.connect((err) => {
        if (err) {
            console.log('Error occurred', err);
        } else {
            console.log('Connected to MySQL Server');
        }
    });

    const query =
        'CREATE TABLE IF NOT EXISTS users' +
        '(id INT AUTO_INCREMENT, ' +
        'email VARCHAR(255), ' +
        'password VARCHAR(255), ' +
        'create_date DATETIME, ' +
        'update_date DATETIME, ' +
        'token VARCHAR(255),' +
        'PRIMARY KEY(id))';

    connection.query(query, function (err, rows) {
        if (err) {
            console.log('Error occurred', err);
        } else {
            console.log(rows);
        }
    });
};

module.exports = {
    initializeDB,
};
