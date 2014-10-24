var request = require('request')

var Boards = require('../controllers/boardController')
var authHeader = {'Authorization': 'Bearer DwOgwvh219Pvh3BHEv8T0Jwl4Wy0WQYk'}
var BoardID


describe('Board Tests', function() {
    
    
    describe('CREATE Board', function(){
        
        it('Should create a board', function(done) {
            
            request.post({
                url: 'http://localhost:3000/api/v1/boards/',
                headers: authHeader,
                form: {name:'Test'}
                
            }, function(error, res, body) {
                               
                res.statusCode.should.equal(201);
                
                var board = JSON.parse(body)
                
                board.should.have.property('name','Test')
                
                BoardID = board._id
                
                done()
            })
            
        })
        
    })
    
    
    
    
    describe('READ Board', function(){
        
        it('Should be able to get board by id', function(done) {
            
            request({
                url: 'http://localhost:3000/api/v1/boards/'+BoardID,
                headers: authHeader
            }, function(error, res, body) {
                               
                res.statusCode.should.equal(200);
                
                var board = JSON.parse(body)
                
                board.should.have.property('name','Test')
                
                done()
            });
            
        })
        
    })
    
    describe('UPDATE Board', function(){
        
        it('Should change board name', function(done) {
            
            request({
                method: 'PUT',
                url: 'http://localhost:3000/api/v1/boards/'+BoardID,
                headers: authHeader,
                form: {name: 'Update'}
                
            }, function(error, res, body) {
                               
                res.statusCode.should.equal(200);
                
                var board = JSON.parse(body)
                
                board.should.have.property('name','Update')
                
                done()
            })
            
        })
        
    })
    
    describe('DELETE Board', function(){
        
        it('Should delete board', function(done) {
            
            request({
                method: 'DELETE',
                url: 'http://localhost:3000/api/v1/boards/'+BoardID,
                headers: authHeader
                
            }, function(error, res, body) {
                               
                res.statusCode.should.equal(200);
                
                done()
            })
            
        })
        
    })
   
})