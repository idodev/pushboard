module.exports = function(app, passport, socket) {
        
    // =====================================
	// HOME PAGE (with login links) ========
	// =====================================
    app.get('/', function(req, res) {
        res.render('index')
    })
    
    // =====================================
	// LOGIN ===============================
	// =====================================
	// show the login form
    app.get('/login', function(req, res) {
        
        //render login page, passing in flash message if it exists
        res.render('login', { message: req.flash('loginMessage') })
    })
    
    // process the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect: '/boards',
        failureRedirect: '/login',
        failureFlash: true
    }))
    
    
    // =====================================
	// SIGNUP ===============================
	// =====================================
	// show the signup form
    app.get('/signup', function(req, res) {
        
        // render the signup page, passing in a flash message if it exists
        res.render('signup', {message: req.flash('signupMessage') })
    })
    
    
    
    // process the login form
    app.post('/signup', passport.authenticate('local-signup', {
        successRedirect: '/profile',
        failureRedirect: '/signup',
        failureFlash: true
    }))
    
    
    // =====================================
	// PROFILE SECTION =====================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	app.get('/profile', isLoggedIn, function(req, res) {
		res.render('profile', {
			user : req.user // get the user out of session and pass to template
		})
	})
    
    
	// =====================================
	// LOGOUT ==============================
	// =====================================
	app.get('/logout', function(req, res) {
		req.logout()
		res.redirect('/')
	})
    
    
    // =====================================
	// BOARDS ==============================
	// =====================================
	// we will want this protected so you have to be logged in to visit
	app.get('/boards', isLoggedIn, function(req, res) {
		res.render('boards', {
			user : req.user // get the user out of session and pass to template
		})
	})
    
    
    
    
}

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is currently authenticated in the session then carry on
    if( req.isAuthenticated()) 
        return next()

        // if they arent then redirect them to the login page
        res.redirect('/login')

}


