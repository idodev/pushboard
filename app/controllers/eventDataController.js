var EventData = require('../models/eventData')

module.exports = {
     
    create: function (req, res) {
        var jsonValue
        try {
            jsonValue = JSON.parse(req.body.value)
        }
        catch (e) {
            res.statusCode = 400
            return res.json({err:'Value is not valid JSON'})
        }
        
        var newEventData = new EventData()
        newEventData.event = req.params.event_id
        newEventData.value = jsonValue
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