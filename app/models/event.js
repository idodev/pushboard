var mongoose = require('mongoose')
var Schema = mongoose.Schema

var eventSchema =  Schema({

    name: String,
    description: String,
    board: { type: Schema.Types.ObjectId, ref: 'Board' }
    
})  

module.exports = mongoose.model('Event', eventSchema)