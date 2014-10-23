var BoardController = require('../controllers/boardController')
var EventController = require('../controllers/eventController')

module.exports = function(app, passport, io) {
    
    // =====================================
	// API V1 ==============================
	// =====================================
	var apiAuth = [passport.authenticate('api-login', {session: false})]
    
    app.get('/api/v1', apiAuth, function(req, res) {
        res.end("You're connected to the PushBoard API v1")
    })
    
    // boards ========================================================================
    
    app.get('/api/v1/boards', apiAuth, function(req, res) {
        BoardController.findAll(req,res)
    })
    
    app.post('/api/v1/boards', apiAuth, function(req, res) {
        BoardController.create(req,res);
    })
    
    app.get('/api/v1/boards/:board_id', apiAuth, function(req, res) {
        BoardController.findOne(req,res)
    })
    app.put('/api/v1/boards/:board_id', apiAuth, function(req, res) {
        BoardController.update(req,res)
    })
    app.delete('/api/v1/boards/:board_id', apiAuth, function(req, res) {
        BoardController.delete(req,res)
    })
    
    
    // events ========================================================================
    
    app.get('/api/v1/boards/:board_id/events', apiAuth, function(req, res) {
        EventController.findAll(req,res)
    })
    
    app.post('/api/v1/boards/:board_id/events', apiAuth, function(req, res) {
        var event = EventController.create(req,res)
        io.sockets.emit("activity", {msg:"created", event: event});
    })
    
    app.get('/api/v1/boards/:board_id/events/:event_id', apiAuth, function(req, res) {
        EventController.findOne(req,res)
    })
    
    app.put('/api/v1/boards/:board_id/events/:event_id', apiAuth, function(req, res) {
        EventController.update(req,res)
    })
    
    app.delete('/api/v1/boards/:board_id/events/:event_id', apiAuth, function(req, res) {
        EventController.delete(req,res)
    })
    
}

function isLoggedIn(req, res, next) {

    // if user is currently authenticated in the session then carry on
    if( req.isAuthenticated()) 
        return next()
    

        // if they arent then redirect them to the login page
        res.redirect('/login')

}

