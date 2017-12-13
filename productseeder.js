var Prodotto= require('./models/prodotto.js');
var mongoose=require('mongoose');
mongoose.connect('mongodb://remocottilli:ciaociao93@ds113136.mlab.com:13136/mrmsdb');

var prodottos= [
    new Prodotto({
    imagePath:'img/iphonex.jpg',
    nome:'iphone x',
    descrizione: 'su iphone x il protagonista assoluto è lo schermo: un nuovissimo display super retina da 5,8", perfetto nel palmo della mano e splendido per gli occhi.',
    prezzo: 1200,
    quantita: 12
}),
new Prodotto({
    imagePath:'img/fifa18.jpg',
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
