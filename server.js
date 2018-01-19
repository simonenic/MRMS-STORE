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






mongoose.connect('mongodb://remocottilli:ciaociao93@ds113136.mlab.com:13136/mrmsdb', function(err){
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
    },
    tls:{
        rejectUnauthorized: false
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

app.post('/acquista',function(req,res){

    
    Prodotto.findOne({nome: req.body.nome}, function(err, prodotto){
        if(err){
            return res.send("impossibile avviare la richiesta");
        }
        if(prodotto != null){
            prodotto=prodotto.toJSON();
            var quantita2= prodotto.quantita;
            if(quantita2==0){
                return res.redirect('/#!/acquisto-errato');
            }
            quantita2=quantita2- req.body.quantita;
            if(quantita2<=0){
                return res.redirect('/#!/acquisto-errato');
            }
            if(quantita2<=3){
                var mailOptions ={
                    from: 'info.mrmsstore@gmail.com',
                    to: 'info.mrmsstore@gmail.com',
                    subject:'Avviso prodotto #'+prodotto.id,
                    text:'Il prodotto'+prodotto.nome+'('+prodotto.descrizione+') sta per terminare'
                }
                //Invio Email
                transporter.sendMail(mailOptions, function(error, info){
                    if(error){
                        res.status(500).send("impossibile inviare email");
                    }else{
                        res.status(200).send("Email inviata correttamente");
                    }
                    });
                }
                    Prodotto.findOneAndUpdate({nome:req.body.nome}, {$set: {quantita:quantita2}}, function(err,prodotto2){
                        if(err){
                            return res.send('Impossibile aggiornare i valori nel database');
                        }
                    });
                    mailOptions={
                        from: 'info.mrmsstore@gmail.com',
                        to: req.body.email,
                        subject:'Acquisto prodotto #'+prodotto.nome,
                        text:'Salve ,\nla vogliamo informare che ha appena acquistato '+
                        'Il prodotto:'+prodotto.nome+'('+prodotto.descrizione+') in '+req.body.quantita+'quantità'+
                        '\nArrivederci'
                    }
                    //Invio Email
                    transporter.sendMail(mailOptions, function(error, info){
                        if(error){
                            res.status(500).send("Impossibile inviare email");
                        }else{
                            res.status(200).send("Email inviata correttamente");
                        }
                    });
                    return res.redirect('/#!/acquisto-corretto');
            }
            else{
                return res.redirect('/#!/acquisto-errato');
            }

    //else{
    //    res.sendFile(__dirname+'/templates/403.html');
    })
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