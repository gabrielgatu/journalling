var LocalStrategy   = require('passport-local').Strategy;
var User = require('../../app/models/users');
var bCrypt = require('bcrypt-nodejs');

module.exports = function(passport){

	passport.use('signup', new LocalStrategy({
            passReqToCallback : true // allows us to pass back the entire request to the callback
        },
        function(req, username, password, done) {

            findOrCreateUser = function(){
                // find a user in Mongo with provided username
                User.findOne({ 'name' :  username }, function(err, user) {
                    // In case of any error, return using the done method
                    if (err){
                        return done(err);
                    }
                    // already exists
                    if (user) {
                        return done(null, false, req.flash('message','User Already Exists'));
                    } else {
                        // if there is no user with that email
                        // create the user
                        var newUser = new User();

                        // set the user's local credentials
                        newUser.name = name;
                        newUser.password = createHash(password);
                        newUser.email = req.param('email');
                        newUser.createdAt = new Date();

                        // save the user
                        newUser.save(function(err) {
                            if (err){
                                throw err;  // Error on saving
                            }
                            // Registration successfull
                            return done(null, newUser);
                        });
                    }
                });
            };
            // Delay the execution of findOrCreateUser and execute the method
            // in the next tick of the event loop
            process.nextTick(findOrCreateUser);
        })
    );

    // Generates hash using bCrypt
    var createHash = function(password){
        return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
    }

}