// const users = require('./userCreate');
const { connection } = require('../model/connection');

const getUsers = async (req, res) => {
    try {
        const users = [];

        const queryData = await queryDatabase();

        for (i in queryData) {
            users.push(JSON.parse(JSON.stringify(queryData[i])));
        }

        res.set('Content-Type', 'application/json').status(200).json({
            error: 0,
            description: 'OK',
            data: users,
            utc: new Date().toUTCString(),
        });
    } catch (err) {
        console.log(err);
        res.set('Content-Type', 'application/json').status(400).json({
            error: 1,
            description: err.message,
            utc: new Date().toUTCString(),
        });
    }

    function queryDatabase() {
        const query = 'SELECT * FROM users';

        return new Promise((resolve, reject) => {
            connection.query(query, (err, rows) => {
                if (err) {
                    console.log('Error occurred', err);
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        });
    }
};

module.exports = {
    getUsers,
};
