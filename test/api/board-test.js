var requireHelper = require('../requireHelper')
var should       = require('should')
var request      = require('supertest')
var mongoose     = require('mongoose')
var configDB     = requireHelper('config/database')

var app = requireHelper('app')
var Board = requireHelper('models/board')

var authHeader = {'Authorization': 'Bearer DwOgwvh219Pvh3BHEv8T0Jwl4Wy0WQYk'}
var authToken = 'Bearer DwOgwvh219Pvh3BHEv8T0Jwl4Wy0WQYk'


describe('Model Tests',function() {
    
    it('Should create a board',function(done){
        var newBoard = new Board()
        newBoard.name = 'Model Test'
        newBoard.save( function ( err, board ) {
            should.not.exist(err)
            board.should.have.property('name','Model Test')
            
            done()
        })
    })
    
})

describe('API Board Tests', function() {
    
    
    describe('CREATE Board', function(){
        
        it('Should create a board', function(done) {
            
            request(app)
            .post('/api/v1/boards/')
            .send({name:'Test'})
            .set('Authorization',authToken)
            .end(function(error, res) {

                res.statusCode.should.equal(201)
                res.body.should.have.property('name','Test')
                
                // set BoardID for later tests
                BoardID = res.body._id
                
                done()
            })
            
        })
        
    })
    
    describe('READ Board', function(){
        
        it('Should be able to get board by id', function(done) {
            
            request(app)
            .get('/api/v1/boards/'+BoardID)
            .set('Authorization',authToken)
            .end(function(error, res) {
                res.statusCode.should.equal(200);
                res.body.should.have.property('name','Test')
                done()
            })
            
            
        })
        
    })
    
    describe('UPDATE Board', function(){
        
        it('Should change board name', function(done) {
            
            request(app)
            .put('/api/v1/boards/'+BoardID)
            .send({name: 'Update'})
            .set('Authorization',authToken)
            .end(function(error, res) {
                res.statusCode.should.equal(200);
                res.body.should.have.property('name','Update')
                done()
            })
            
        })
        
    })
    
    describe('DELETE Board', function(){
        
        it('Should delete board', function(done) {
            
            request(app)
            .delete('/api/v1/boards/'+BoardID)
            .set('Authorization',authToken)
            .end(function(error, res) {
               res.statusCode.should.equal(200); 
               done()
            })
            
        })
        
    })
   
})