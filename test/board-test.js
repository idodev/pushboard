var request = require('request')

var Boards = require('../controllers/boardController')
var authHeader = {'Authorization': 'Bearer DwOgwvh219Pvh3BHEv8T0Jwl4Wy0WQYk'}


describe('Board Tests', function() {
    
    
    
    
    describe('Get Board by Id', function(){
        
        it('Should be able to get board by id', function(done) {
            
            request({
                url: 'http://localhost:3000/api/v1/boards/534eabbd1c34658e040e7a74',
                headers: authHeader
            }, function(error, res, body) {
                               
                res.statusCode.should.equal(200);
                
                var board = JSON.parse(body)
                
                board.should.have.property('name')
                
                done()
            });
            
        })
        
    })
    
    
})