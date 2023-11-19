const bcrypt = require('bcryptjs');
const { connection } = require('../model/connection');
const { queryFindUserDB } = require('../model/findUser');
const globalCache = require('./userLogin');

const postCreateHandler = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const repeatPassword = req.body.repeatPassword;

        const contentType = req.headers['content-type'];

        const form_data = {
            email: email,
            password: bcrypt.hashSync(password, 10, null),
            create_date: new Date(),
            update_date: new Date()
        };

        if (contentType != 'application/json')
            throw new Error('Content-Type is incorrect');
        if (!email && !password)
            throw new Error('email and password are missed');
        if (!email) throw new Error('email is missed');
        if (!password) throw new Error('password is missed');

        console.log(globalCache.globalCache.get(6));

        if (password === repeatPassword) {
            const resQueryFindUserDB = await queryFindUserDB(form_data);

            if (resQueryFindUserDB[0].count_email > 0) {
                throw new Error('user exists with this email');
            } else {
                const resQueryUserCreateDB = await queryCreateUserDB();

                console.log(resQueryUserCreateDB);
            }

            // .then(() => {
            //     res.set('Content-Type', 'application/json')
            //         .status(200)
            //         .json({
            //             error: 0,
            //             description: 'OK',
            //             utc: new Date().toUTCString(),
            //         });
            // })
            // .catch(function (err) {
            //     res.set('Content-Type', 'application/json')
            //         .status(400)
            //         .json({
            //             error: 1,
            //             description: err.message,
            //             utc: new Date().toUTCString(),
            //         });
            // });

            res.set('Content-Type', 'application/json').status(200).json({
                error: 0,
                description: 'OK',
                utc: new Date().toUTCString(),
            });
        } else {
            throw new Error('password and repeatPassword mismatch');
        }

        //db select
        // const max_id = connection.query(
        //     'SELECT max(id) as max FROM users',
        //     function (err, rows) {
        //         if (err) {
        //             console.log('Error occurred', err);
        //         } else {
        //             console.log(rows[0].max);
        //         }
        //     }
        // );

        // const max_id = connection.query(
        //     'SELECT count(email) as count_email FROM users WHERE email =' + form_data.email,
        //     function (err, rows) {
        //         if (err) {
        //             console.log('Error occurred', err);
        //         } else {
        //             console.log(rows);
        //         }
        //     }
        // );

        // console.log(now.format('%Y-%m-%d %H:%M:%S'));

        const create_date_db = connection.query(
            'SELECT DATE_FORMAT(create_date,' +
                '"%m/%d/%Y %T"' +
                ') as date FROM users',
            function (err, rows) {
                if (err) {
                    console.log('Error occurred', err);
                } else {
                    console.log(rows);
                    // console.log(rows[0].date);
                }
            }
        );

        // console.log(
        //     new Date().toISOString().replace(/T/, ' ').replace(/\..+/, '')
        // );

        function queryCreateUserDB() {
            return new Promise((resolve, reject) => {
                connection.query(
                    'INSERT INTO users SET?',
                    form_data,
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
    postCreateHandler,
};
