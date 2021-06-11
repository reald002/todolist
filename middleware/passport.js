const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const Users = require('../models/User');

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(options, async (payload, done) => {
            try {
                const user = await Users.findById(payload.userId).select('username id');
                if(user) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            } catch (e) {
                console.log(e);
            }
        })
    );
};
