const express = require('express');
const { MongoClient } = require('mongodb');
const debug = require('debug')('app:authRoutes');
const passport = require('passport');

const authRouter = express.Router();
function router (nav) {
    authRouter.route('/signUp')
        .post((req, res) => {
            // The post method works a bit different so here we are going to be 
            // using a package called body parser in order to handle our request
            const { username, password } = req.body;
            console.debug(req.body);
            const url = 'mongodb://localhost:27017';
            const dbName = 'LibraryApp';
            (async function addUser() {
                let client;
                try {
                    client = await MongoClient.connect(url);
                    debug('Connected Successfully');
                    const db = await client.db(dbName);
                    const col = db.collection('users');
                    const user = { username, password };
                    const results = await col.insertOne(user);
                    debug(req.body); 
                    // Create User
                    req.logIn(results.ops[0], () => {
                        res.redirect('/auth/profile');
                    });  

                } catch (err) {
                    debug(err)
                }
            }())
                     
        });
    authRouter.route('/signin')
        .get((req, res) => {
            res.render(
                'signin',
                {
                    nav,
                    title: `Sign In`
                }
            )
        })
        .post(passport.authenticate('local', {
            successRedirect: '/auth/profile',
            failureRedirect: '/'
        }))
    authRouter.route('/profile')
        .all((req, res, next) => {
            if (req.user) {
                next();
            } else {
                res.redirect('/');
            }
        })
        .get((req, res) => {
            res.json(req.user);
        });

    return authRouter;
}

module.exports = router;

