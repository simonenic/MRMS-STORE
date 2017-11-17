var Prodotto = require('../models/Prodotto');
var mongoose= require('mongoose');
mongoose.connect('localhost:27017/mrmsdb');


var prodotti = [
new Prodotto({
    imagePath :'immagini/fifa 18.jpg',
    h3: 'Fifa 18',
    descrizione: 'Videogame',
    prezzo: 10
}),
new Prodotto({
imagePath :'immagini/fifa 18.jpg',
h3: 'Fifa 18',
descrizione: 'Videogame',
prezzo: 12
}),
new Prodotto({
    imagePath :'immagini/fifa 18.jpg',
    h3: 'Fifa 18',
    descrizione: 'Videogame',
    prezzo: 15
    })];
var done=0;
    for(var i =0; i< prodotti.length;i++){
        prodotti[i].save(function(err, result){
            done++;
            if(done===prodotti.length){
                exit();
            }

        });
    }

function exit(){
    mongoose.disconnect();
}

   
