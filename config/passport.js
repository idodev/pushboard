var LocalStrategy = require('passport-local').Strategy
var BearerStrategy = require('passport-http-bearer').Strategy

// get user model
var User = require('../app/models/user')

module.exports = function(passport) {
    
    // passport session setup ==========================================================================
    // required for persistent login sessions
    // passport needs to be able to serialize and deserialize users out of session
     
    // used to serialize user to go into session
    passport.serializeUser(function(user,done) {
       done(null,user.id)
    })
    
    // used to deserialize user out of session
    passport.deserializeUser(function(id, done) {
        User.findById(id, done)
    })
    
    
    // local signup ====================================================================================
    passport.use('local-signup', new LocalStrategy({
        //by default local strategy uses username, here its being overridden with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req,email,password,done) {
        
        // asynchronous
        process.nextTick(function() {
            
            // find a user whose email matches
            User.findOne({ 'local.email': email }, function(err, user) {
                // if there's an error, return it
                if (err)
                    return done(err)
                
                // check to see if there is already a user with this email
                if(user) {
                    
                    return done(null, false, req.flash('signupMessage', 'That email already has an account'))
                    
                } else {
                    
                    // no user found so we can continue
                    
                    if(!emailValidation(email))
                        return done(null, false, req.flash('signupMessage', 'Email provided is not valid'))
                    
                    if(!passwordValidation(password))
                        return done(null, false, req.flash('signupMessage', 'Password must be >6 characters containing: lowecase, uppercase, digit and symbol'))
                    
                    var newUser = new User()
                    
                    newUser.local.email = email
                    newUser.local.password = newUser.generateHash(password)
                    newUser.local.apiKey = newUser.generateApiKey()
                    newUser.save(function(err) {
                        
                        if(err) {
                            console.log(err)
                            return done(null, false, req.flash('signupMessage', err.message))
                        }
                        
                        return done(null,newUser)
                    })
                    
                }
            })
        })
    }))
    
    
    // local login =====================================================================================
    passport.use('local-login', new LocalStrategy({
        //by default local strategy uses username, here its being overridden with email
        usernameField: 'email',
        passwordField: 'password',
        passReqToCallback: true
    },
    function(req,email,password,done) {
        
        // asynchronous
        process.nextTick(function() {
            
            // find a user whose email matches
            User.findOne({ 'local.email': email }, function(err, user) {
                // if there's an error, return it
                if (err)
                    return done(err)
                
                // check to see if there is already a user with this email
                if(!user)
                    return done(null, false, req.flash('loginMessage', 'email or password incorrect'))
                    
                //there is a user!, check that the password matches
                if(user.validPassword(password))
                    return done(null, false, req.flash('loginMessage', 'email or password incorrect'))
                
                return done(null,user)
            })
        })
    }))
    
    // api login =======================================================================================
    passport.use('api-login', new BearerStrategy({
        passReqToCallback: true
    },
    function(req,token,done){
        
        // asynchronous
        process.nextTick(function() {
            User.findOne({ 'local.apiKey': token}, function(err, user) {
                // if there's an error, return it
                if (err)
                    return done(err)
                
                // check to see if there is already a user with this email
                if(!user)
                    return done(null, false)
                
                return done(null,user)
            })
        })
    }))
    
}


// validation ======================================================================================
// email
function emailValidation(email) {
    var validEmailPattern = new RegExp('^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$')
    return validEmailPattern.test(email)
}

// password
function passwordValidation(password) {
    var validPasswordPattern = new RegExp('((?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!£^&*~?@#$%]).{6,20})')
    return validPasswordPattern.test(password)
}