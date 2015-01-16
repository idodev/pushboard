var mongoose = require('mongoose')
var Schema = mongoose.Schema

var eventSchema =  Schema({

    timestamp : { type : Date, default: Date.now },
    value: Schema.Types.Mixed,
    event: { type: Schema.Types.ObjectId, ref: 'Event' }
    
})  

module.exports = mongoose.model('EventData', eventSchema)