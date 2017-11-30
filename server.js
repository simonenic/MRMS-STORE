var express=require('express');
var app= express();
var port= process.env.PORT|| 8080;
var morgan= require('morgan');
var mongoose= require('mongoose');
var bodyParser= require('body-parser');
var router = express.Router();
var appRoutes= require('./routes/api.js')(router);
var path= require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/Client/www'));
app.use('/api',appRoutes);



mongoose.connect('mongodb://remocottilli:ciaociao93@ds113136.mlab.com:13136/mrmsdb', function(err){
    if (err){
        console.log('Non connesso al database: '+ err);
    }else{
        console.log('Connesso a MongoDB');
    }
});


app.get('*',function(req,res){
    res.sendFile(path.join(__dirname +'/Client/www/index.html'));
});
app.listen( port, function(){
    console.log('Server partito alla porta'+port);
});