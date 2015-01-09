
// set up ==========================================================================================
var express      = require('express')
var app          = express()
var http         = require('http')
var server       = http.createServer(app)
var io           = require('socket.io').listen(server)
var port         = process.env.PORT || 3000

var mongoose     = require('mongoose')
var passport     = require('passport')
var flash        = require('connect-flash')




var configDB = require('./config/database')

// configuration ===================================================================================
mongoose.connect(configDB.url)

require('./config/passport')(passport)

app.configure(function() {
    
    // set up our express application
    app.use(express.logger('dev')) // log all requests to the console
    app.use(express.cookieParser()) // auth requires cookies
    app.use(express.bodyParser()) //fetch html form information
    
    app.set('view engine', 'ejs')
    
    app.use(express.static(process.cwd() + '/public'));
    
    // passport config
    app.use(express.session({ secret: '8DVxPrNqAD46dhnKPPfeUgsn' }))
    app.use(passport.initialize())
    app.use(passport.session()) // for persistent login sessions
    app.use(flash()) //flash messages that are stored in session
    
})

// launch ==========================================================================================
server.listen(port)
console.log('Listening on port ' + port)

// socket initializing =============================================================================

io.on('connection',function(socket){
  socket.emit('init',{msg:"test"})
})

// routes ==========================================================================================
require('./routes/routes')(app, passport,io) //load main routes, passing application, passport and socket reference
require('./routes/api-v1')(app, passport,io) //load api routes, passing application, passport and socket reference


exports = module.exports = server;
// delegates use() function
exports.use = function() {
  app.use.apply(app, arguments);
};



