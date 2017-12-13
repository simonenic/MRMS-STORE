var mongoose= require('mongoose');
var Schema= mongoose.Schema;

var ProdottoSchema= new Schema ({
    imagePath:{type:String, require:true},
    nome: {type: String , lowercase: true, require: true, unique : true},
    descrizione:{ type: String, lowercase: true, require: true, unique: true},
    prezzo: {type: Number},
    quantita:{ type: Number}
});



module.exports= mongoose.model('Prodotto',ProdottoSchema);