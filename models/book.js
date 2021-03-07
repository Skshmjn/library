var mongoose = require('mongoose');
var uuid = require('uuid');
var Schema = mongoose.Schema;

const schemaOptions = {
    timestamps: { createdAt: 'created_at', updatedAt: 'updated_at' },
  };
  

var BookSchema = new Schema({
    uuid: {
        type: String,
        index: true,
        default: () => uuid.v1()
    },
    name: {
        type: String,
        sparse: true,
        required: true
    },
    releaseDate: {
        type: Number,
        default: ()=>Math.floor(Date.now() / 1000)
    },
    authorName: {
        type: String,
        required: true
    },
},schemaOptions);

module.exports = mongoose.model('Book', BookSchema);