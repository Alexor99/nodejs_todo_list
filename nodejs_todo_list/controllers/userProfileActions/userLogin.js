const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const NodeCache = require('node-cache');
const { connection } = require('../../model/connectionDB');
const { queryFindUserDB } = require('../../model/findUserDB');
const { getUserByEmail } = require('../../model/getUserByEmailDB');
const { updateUserToken } = require('../../model/updateUserTokenDB');

let globalCache = new NodeCache({ stdTTL: 30 });

const getLoginHandler = (req, res) => {
    res.send('Get Login');
};

const postLoginHandler = async (req, res) => {
    try {
        const email = req.body.email;
        const password = req.body.password;
        const form_data = {
            email: email,
            password: password,
        };
        const resQueryFindUserDB = await getUserByEmail(form_data);
        console.log(resQueryFindUserDB[0].password);
        console.log(form_data.password);

        if (
            isValidPassword(form_data.password, resQueryFindUserDB[0].password)
        ) {
            console.log('valid pass');

            const auth_data = {};

            if (globalCache.get(resQueryFindUserDB[0].id) == undefined) {
                const uuid4 = uuid.v4();
                auth_data.token = JSON.stringify(uuid4);

                // const resUpdateUserToken = updateUserToken(
                //     auth_data.token,
                //     resQueryFindUserDB[0].id
                // );
                // console.log(resUpdateUserToken);

                // const resGetUserByEmail = await getUserByEmail(form_data);
                // setInMemoryCache(
                //     resQueryFindUserDB[0].id,
                //     resQueryFindUserDB[0].token
                // );
                // console.log(
                //     'updated cache ttl by fetch token from DB: ' +
                //         globalCache.get(resQueryFindUserDB[0].id)
                // );

                const cache = setInMemoryCache(
                    resQueryFindUserDB[0].id,
                    auth_data.token
                );
                console.log(
                    'new token in cache : ' +
                        cache.get(resQueryFindUserDB[0].id)
                );
            } else {
                console.log(
                    'token: ' +
                        globalCache.get(resQueryFindUserDB[0].id) +
                        ' still in cache'
                );
            }

            res.set('Content-Type', 'application/json').status(200).json({
                error: 0,
                description: 'OK',
                utc: new Date().toUTCString(),
            });
        } else {
            throw new Error('password incorrect');
        }
    } catch (err) {
        console.log(err);
        res.set('Content-Type', 'application/json').status(400).json({
            error: 1,
            description: err.message,
            utc: new Date().toUTCString(),
        });
    }

    function isValidPassword(data, password) {
        return bcrypt.compareSync(data, password);
    }

    function setInMemoryCache(user_id, token) {
        globalCache.set(user_id, token);
        return globalCache;
    }
};

module.exports = {
    postLoginHandler,
    getLoginHandler,
    globalCache,
};
