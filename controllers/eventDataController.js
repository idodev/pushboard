var EventData = require('../models/eventData')

module.exports = {
     
    create: function (req, res) {
        var newEventData = new EventData()
        newEventData.event = req.params.event_id
        newEventData.value = req.body.value
        newEventData.save(function(err) {
            
            if(err) {
                res.statusCode = 400
                return res.json({err:'Failed to create event data'})
            }
            
            res.send(201)
            
        })
    },
    
    findAll: function (req, res) {
        
    },
    
    findRange: function(req, res) {
        
    },
    
    deleteAll: function(req, res) {
            
    }
}