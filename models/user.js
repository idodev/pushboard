var mongoose = require('mongoose')
var bcrypt = require('bcrypt-nodejs')
var randomstring = require('randomstring')

// schema ==========================================================================================
var userSchema =  mongoose.Schema({
    
    local: {
        email: String,
        password: String,
        apiKey: String
    }
    
})

// methods =========================================================================================
// generate the hash
userSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}

// validate the passed password
userSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password)
}

// create an api key
userSchema.methods.generateApiKey = function() {
    return randomstring.generate(32)
}

// create the model and expose it to the app
module.exports = mongoose.model('User', userSchema)