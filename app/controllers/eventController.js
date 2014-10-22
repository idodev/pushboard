var Board = require('../models/board')
var Event = require('../models/event')

module.exports = {
    
    create: function( req, res ) {
        
                Board.findById(req.params.board_id, function ( err, board ) {
                    
                   if(err) {
                       res.statusCode = 400
                       return res.json({msg:'Board not found for id ' + req.params.board_id})
                   }
                    
                    var newEvent = new Event()
                    newEvent.board = board
                    newEvent.name = req.body.name
                    newEvent.description = req.body.description
                    newEvent.save( function( err, event ) {
                        
                        if(err) {
                            res.statusCode = 400
                            return res.json({msg:err.message})
                        }
                    
                        board.events.push(event)
                        board.save()
                        
                        res.json({ event:event, board:board })
                        
                        return event
                    })
                    
                })
                
            },
    
    findAll: function( req, res ) {
        
        Event.find({'board':req.params.board_id}, function( err, events ) {
                    
                    if(err) {
                        res.statusCode = 400
                        return res.json({msg:'Events not returned for Board id ' + req.params.board_id})
                    }
                    
                    res.json(events)
                    
                })

            },
    
    findOne: function( req, res ) {
            
                Event.findById(req.params.event_id, function ( err, event ) {
                    
                    if(err) {
                        res.statusCode = 400
                        return res.json({msg:'Event not returned for id ' + req.params.event_id})
                    }
                    
                    res.json(event)
                    
                })

            },
    
    update: function( req, res ) {
        
                Event.findById(req.params.event_id, function ( err, event ) {
                    
                    if(err) {
                        res.statusCode = 400
                        return res.json({msg:'Event not returned for id ' + req.params.event_id})
                    }
                    
                    event.name = req.body.event.name
                    event.description = req.body.event.description
                    event.save(function(err) {
                        
                        if(err) {
                            res.statusCode = 400
                            return res.json({msg:err.message})
                        }
                        
                        res.json(event)
                        
                    });
                    
                })
                
            },
    
    delete: function( req, res ) {
                
                Event.findById(req.params.event_id, function ( err, event ) {
                    
                    if(err) {
                        res.statusCode = 400
                        return res.json({msg:'Event not returned for id ' + req.params.event_id})
                    }
                    
                    // delete the event
                    event.remove( function(err){
                        
                        if(err) {
                            res.statusCode = 400
                            return res.json({msg:'Event not removed for id ' + event.id})
                        }
                        
                        // remove the reference to the event from its board
                        Board.update({'_id':event.board},{ $pull: { events: event.id }},function(err,affectedRows) {
                            
                            if(err) {
                                res.statusCode = 400
                                return res.json({msg:'Event removed, but association in board remains ' + event.board})
                            }
                            
                            res.send(200)
                            
                        })
                        
                    })
                    
                })
                
            }
}