// const users = require('./userCreate');
const { getUsersDB } = require('../../model/getUsersDB');

const getUsers = async (req, res) => {
    try {
        const users = [];

        const queryData = await getUsersDB();

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
};

module.exports = {
    getUsers,
};
