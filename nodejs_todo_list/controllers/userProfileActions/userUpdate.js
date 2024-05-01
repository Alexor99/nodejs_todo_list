const express = require('express');
const {globalCache} = require('../userProfileActions/userLogin');
const {getTokenByUser} = require('../../model/getTokenByUserDB')
const {updateUser} = require('../../model/updateUserDB')


const putUpdateUserHandler = async (req, res) => {

    try{
        const userId = req.params.userId;
        const token = req.query.token;
        // const token = req.body.token;
        const email = req.body.email;

        const body = req.body;
        console.log(body)


        const userToken = await getUserToken(userId);
        if(userToken.token != null){
            if(verifyReqTokenEqualUserToken(userId, token) == true){
                console.log('Requested token equal userToken')
                executeUpdate(userId, body)
            }
            else {
                console.log('Requested token NOT equal userToken')
            }
        }
        
        res.set('Content-Type', 'application/json').status(200).json({
            error: 0,
            description: 'OK',
            utc: new Date().toUTCString(),
        });
    }
    catch(err){
        console.log(err);
        res.set('Content-Type', 'application/json').status(400).json({
            error: 1,
            description: err.message,
            utc: new Date().toUTCString(),
        });
    }

    // check if token empty in cache and expire_date in DB hasn't come yet > 

    // res.send('Put Update');

    // rewrite saving user token(replace tokens to separate table)
    // request put method with userId and token in url and body with update data
    // validate user token
    // update user data in users table
    // return result

}


 function verifyReqTokenEqualUserToken(userId, token){
    let userToken = globalCache.get(userId).split('"').join('')
    let compare = token.localeCompare(userToken)
    console.log(compare)
    if(userToken == token) {
        return true
    }
    else {
        return false
    }
}


async function isTokenValid(userId){
    let userToken = await getUserToken(userId)
    if(userToken.token != null){
        console.log(userToken.expire_date);
        console.log(new Date);
        if(userToken.expire_date > new Date){
            return true
        }
        else {
            return false
        }

    }
}

async function getUserToken(userId) {

    if (globalCache.get(userId) == undefined) {
        // const resGetTokenByUser = await getTokenByUser(userId);
        // return resGetTokenByUser[0].token;
        return {
            token: null,
            log: 'User hasnt active tokens. Please login again'
        }
    }
    else{
        return {
            token: globalCache.get(userId),
            expire_date: new Date(globalCache.getTtl(userId))
        }
    }

}

async function executeUpdate(userId, body){
  
    const resUpdateUser  = await updateUser(body, userId);
    console.log(resUpdateUser)

}

module.exports = {
    putUpdateUserHandler
}