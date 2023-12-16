const bcrypt = require('bcryptjs');
const { queryFindUserDB } = require('../../model/findUserDB');
const { queryCreateUserDB } = require('../../model/createUserDB');
const globalCache = require('../userProfileActions/userLogin');

const postCreateUserHandler = async (req, res) => {
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

        // console.log(globalCache.globalCache.get(6));

        if (password === repeatPassword) {
            const resQueryFindUserDB = await queryFindUserDB(form_data);

            if (resQueryFindUserDB[0].count_email > 0) {
                throw new Error('user exists with this email');
            } else {
                await queryCreateUserDB(form_data);
            }

            res.set('Content-Type', 'application/json').status(200).json({
                error: 0,
                description: 'OK',
                utc: new Date().toUTCString(),
            });
        } else {
            throw new Error('password and repeatPassword mismatch');
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
    postCreateUserHandler,
};
