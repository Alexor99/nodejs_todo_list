const bcrypt = require('bcryptjs');
const uuid = require('uuid');
const NodeCache = require('node-cache');
const { connection } = require('../../model/connectionDB');
const { queryFindUserDB } = require('../../model/findUserDB');
const { getUserByEmail } = require('../../model/getUserByEmailDB');
const { updateUserToken } = require('../../model/updateUserTokenDB');
const { createUserToken } = require('../../model/createUserTokenDB');
const { findTokenByUser } = require('../../model/findTokenByUserdDB')

let globalCache = new NodeCache({ stdTTL: 300 });

const getLoginUserHandler = (req, res) => {
    res.send('Get Login');
};

const postLoginUserHandler = async (req, res) => {
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
            
            setUserToken(resQueryFindUserDB[0].id);

            const userInfo = {
                userId: resQueryFindUserDB[0].id,
                userToken: getUserToken(resQueryFindUserDB[0].id)
            };
            
            res.set('Content-Type', 'application/json').status(200).json({
                error: 0,
                description: 'OK',
                utc: new Date().toUTCString(),
                userInfo: userInfo
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

    function setInMemoryCache(userId, token) {
        globalCache.set(userId, token);
        return globalCache;
    }

    async function setUserToken(userId) {
        if (globalCache.get(userId) == undefined) {
            const uuid4 = uuid.v4();
            const auth_data = {};
            auth_data.token = JSON.stringify(uuid4);

            const cache = setInMemoryCache(
                userId,
                auth_data.token
            );

            const formUserIdInUserToken = {
                id: userId
            }

            const resUserIdInUserToken = await findTokenByUser(formUserIdInUserToken)
            console.log('resUserIdInUserToken = ' + resUserIdInUserToken[0].tokenId)

            if(resUserIdInUserToken[0].count_tokenId !== 0) {

                const formUpdateUserToken = {
                    token: auth_data.token,
                    update_date: new Date(),
                    expire_date: new Date(globalCache.getTtl(userId))
                }
                const resUpdateUserToken = await updateUserToken(formUpdateUserToken, userId);
                console.log('resUpdateUserToken = ' + resUpdateUserToken);
            }
            else {
                const formInsertUserToken = {
                    userId: userId,
                    token: auth_data.token,
                    create_date: new Date(),
                    update_date: new Date(),
                    expire_date: new Date(globalCache.getTtl(userId))
                }
                const resInsertUserToken =  await createUserToken(formInsertUserToken);
                console.log('resInsertUserToken = ' + resInsertUserToken[0]);
            }

            console.log(globalCache.getTtl(userId));
            console.log(new Date(globalCache.getTtl(userId)));            

            console.log(
                'new token in cache : ' +
                    cache.get(userId)
            );
        } else {
            console.log(
                'token: ' +
                    globalCache.get(userId) +
                    ' still in cache'
            );
        }
    }
    function getUserToken(userId){
        return globalCache.get(userId);
    }
};

module.exports = {
    postLoginUserHandler,
    getLoginUserHandler,
    globalCache,
};
