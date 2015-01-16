var mongoose = require('mongoose')
var Schema = mongoose.Schema

var boardSchema =  Schema({
    
    name: String,
    description: String,
    events: [{ type: Schema.Types.ObjectId, ref: 'Event' }]
    
})

module.exports = mongoose.model('Board', boardSchema)
    