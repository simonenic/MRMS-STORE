var express=require('express');
var app= express();
var port= process.env.PORT|| 8080;
var morgan= require('morgan');
var mongoose= require('mongoose');
var bodyParser= require('body-parser');
var router = express.Router();
var appRoutes= require('./routes/api.js')(router);
var path= require('path');
var Prodotto= require('./models/prodotto.js');
var nodemailer = require('nodemailer');


app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname + '/Client/www'));
app.use('/api',appRoutes);






mongoose.connect('mongodb://localhost:27017/mrmsdb', function(err){
    if (err){
        console.log('Non connesso al database: '+ err);
    }else{
        console.log('Connesso a MongoDB');
    }
});


//Invio email 
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'info.mrmsstore@gmail.com',
      pass: 'mrmsStore'
    }
  });
//operazione post per invio email
  app.post('/contattaci',function(req,res){
    var mailOptions = {
        from: req.body.email,
        to: 'info.mrmsstore@gmail.com',
        subject: 'Email di contattaci da '+req.body.email,
        text: 'Nome del richiedente: '+req.body.name+'\n\nMessaggio\n'+req.body.message
    };
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
    res.send("Email inviata");      
  });




app.get('/visualizzaprodotti' , function(req,res){
    Prodotto.find({}, function(err, prodotto){
        if(err){
            res.send(err);
       }else{
            if(!prodotto){
                res.send('Prodotto non esistente');
            }else{
                res.send(prodotto);
            }
        }
    });
});

app.get('/about' , function(req,res){
    Prodotto.find({}, function(err, prodotto){
        if(err){
            res.send(err);
       }else{
            if(!prodotto){
                res.send('Prodotto non esistente');
            }else{
                res.send(prodotto);
            }
        }
    });
});




app.get('*',function(req,res){
    res.sendFile(path.join(__dirname +'/Client/www/index.html'));
});
app.listen( port, function(){
    console.log('Server partito alla porta'+port);
});