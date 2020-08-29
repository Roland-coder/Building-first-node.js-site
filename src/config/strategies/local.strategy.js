
const passport = require('passport');
const { Strategy } = require('passport-local');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:local.strategy');

module.exports = function localStrategy () {
    passport.use(new Strategy(
        {
            usernameField: 'username',
            passwordField: 'password'
        }, (username, password, done) => {
            
            const url = 'mongodb://localhost:27017';
            const dbName = 'LibraryApp';
            (async function mongo () {
                let client;
                try {
                    client = MongoClient.connect(url);
                    console.debug('Connected Successfully');
                    const db = (await client).db(dbName);
                    const col = db.collection('users');
                    const user = await col.findOne( { username });
                    console.debug(user);
                    if (user.password === password) {
                        done(null, user);
                    } else {
                        done(null, false);
                    }
                } catch (err) {
                    console.debug(err.stack);
                }
            }())
            
        }));

}