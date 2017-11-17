var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var schema= new Schema({
    imagePath: {type:String, required: true},
    h3: {type:String, required: true},
    descrizione: {type:String, required: true},
    prezzo: {type:Number, required: true}
});

module.exports= mongoose.model('Prodotto', schema);
