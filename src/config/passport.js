const passport = require('passport');
require('./strategies/local.strategy')(); 
module.exports = function passportConfig(app) {
    app.use(passport.initialize());
    app.use(passport.session());
    //  Stores user in a session
    passport.serializeUser((user, done) => {
        done(null, user)
    });

    // Retrieves user from a session
    passport.deserializeUser((user, done) => {
        done(null, user)
    });
    // require('./strategies/local.strategy');
};