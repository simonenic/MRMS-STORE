var Prodotto= require('./models/prodotto.js');
var mongoose=require('mongoose');
mongoose.connect('mongodb://remocottilli:ciaociao93@ds113136.mlab.com:13136/mrmsdb');

var prodottos= [
    new Prodotto({
    imagePath:'img/iphonex.jpg',
    nome:'iphone x',
    descrizione: ' iphone x il protagonista assoluto è lo schermo: un nuovissimo display super retina da 5,8"',
    prezzo: 1200,
    quantita: 12
}),
new Prodotto({
    imagePath:'img/fifa181.jpg',
    nome:'Fifa 18',
    descrizione: 'Videogame',
    prezzo: 50,
    quantita: 10
}),
new Prodotto({
    imagePath:'img/s8.jpg',
    nome:'Samsung s8',
    descrizione: 'Samsung',
    prezzo: 599,
    quantita: 10
}),
new Prodotto({
    imagePath:'img/beats.jpg',
    nome:'Cuffie Beats Solo 3',
    descrizione:'Cuffie',
    prezzo: 120,
    quantita: 10
}),
new Prodotto({
    imagePath:'img/nike.jpg',
    nome: 'Nike Air',
    descrizione:'Scarpe nike adulto',
    prezzo: 80,
    quantita: 12

})

];
var done=0;
for(var i=0; i<prodottos.length; i++){
    prodottos[i].save(function(err, result){
        done++;
        if(done===prodottos.length){
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}
