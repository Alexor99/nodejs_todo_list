const express = require('express');
const globalCache = require('../userProfileActions/userLogin');
const {getTokenByUser} = require('../../model/getTokenByUserDB')


const putUpdateUserHandler = async (req, res) => {

    try{
        const userId = req.params.userId;
        const token = req.query.token;
        const body = req.body;


        const userTokenDB = await getUserToken(userId);
        console.log(userTokenDB)

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

async function isTokenValid(userId){

}

async function getUserToken(userId) {

    if (globalCache.get(userId) == undefined) {
        // const resGetTokenByUser = await getTokenByUser(userId);
        // return resGetTokenByUser[0].token;
        console.log('User hasnt active tokens. Please login again');
    }
    else{
        return globalCache.get(userId);
    }

}

module.exports = {
    putUpdateUserHandler
}