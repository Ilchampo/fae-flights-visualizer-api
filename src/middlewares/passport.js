// Loads passport-jwt module
const { Strategy, ExtractJwt, StrategyOptions } = require('passport-jwt');

// Loads confid and user model
const config = require('../config/config');
const User = require('../models/user.model');

// Creats object for options and set attributes
const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = config.TOKEN.KEY;

// Exports new passport strategy with defined options
module.exports = new Strategy(options, async (payload, done) => {
	try {
		const user = await User.findById(payload.id).lean();
		if (user) return done(null, user);
		done(null, false);
	} catch (err) {
		console.log(`error at auth middleware ${err}`);
	}
});
