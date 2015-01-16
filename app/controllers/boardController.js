var Board = require('../models/board')

module.exports = {
    
    create: function( req, res ) {
            
                var newBoard = new Board()
                newBoard.name = req.body.name
                newBoard.save( function ( err, board ) {
                    if(err) {
                        res.statusCode = 400
                        return res.json({err:err.message})
                    }
                                        
                    res.statusCode = 201
                    res.json(board)
                })
                
            },
    
    findAll: function( req, res ) {
        
                Board.find(function( err, boards ) {
                    if(err) {
                        res.statusCode = 400
                        return res.json({err:err.message})
                    }
                    
                    res.json(boards)
                })

            },
    
    findOne: function( req, res ) {
            
                Board.findById(req.params.board_id).populate('events').exec(function ( err, board ) {
                    if(err) {
                        res.statusCode = 400
                        return res.json({err:err.message})
                    }
                    
                    res.json(board)
                })

            },
    
    update: function( req, res ) {
                Board.findById(req.params.board_id, function ( err, board ) {
                    board.name = req.body.name
                    board.description = req.body.description
                    board.save(function(err) {
                        if(err) {
                            res.statusCode = 400
                            return res.json({err:err.message})
                        }
                        
                        res.json(board)
                    })
                })
            },
    
    delete: function( req, res ) {
                Board.remove({ '_id': req.params.board_id }, function ( err, board ) {
                    if(err) {
                        res.statusCode = 400
                        return res.json({err:err.message})
                    }
                    
                    res.send(200)
                })
            }
}