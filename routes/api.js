var User    = require('../models/user.js');
var Prodotto= require('../models/prodotto.js');
var jwt     =require('jsonwebtoken');
var secret  ='abcdef';

module.exports=function(router){


    //Registrazione utente route
    router.post('/users', function(req,res){
        var user= new User();
        user.username= req.body.username;
        user.password= req.body.password;
        user.email= req.body.email;
        user.nome= req.body.nome;
        if(req.body.username==null || req.body.username==''|| req.body.password==null||req.body.password==''|| req.body.email==null||
         req.body.email==''|| req.body.nome==null || req.body.nome==''){
            res.json({success:false, message:'Username,password e email non forniti'});
    }
   else{
    user.save(function(err){
        if(err) {
            if(err.errors != null){
                if(err.errors.nome){
                    res.json({ success: false, message:err.errors.nome.message});
                }else if(err.errors.email){
                    res.json({ success: false, message:err.errors.email.message});
                }else if(err.errors.username){
                    res.json({success:false, message:err.errors.username.message});
                } else if(err.errors.password){
                    res.json({success:false, message: err.errors.password.message });
                } else{
                    res.json({success: false, message: err});
                }
            }else if(err){
                if (err.code === 11000) {
                    res.json({ success: false, message: 'Username o email già presenti' });
                } else {
                    res.json({ success: false, message: err }); 
                }
            }
            }
            else{
            res.json({success: true, message:'user creato!'});
        }
     });
    }
  });

   router.post('/prodottos', function(req,res){
    var prodotto = new Prodotto();
    prodotto.nome= req.body.nome;
    prodotto.descrizione = req.body.descrizione;
    prodotto.prezzo = req.body.prezzo;
    prodotto.quantita= req.body.quantita;
    prodotto.immagine= req.body.immagine;
    if(req.body.nome== null || req.body.nome=='' ||req.body.descrizione==null|| req.body.descrizione==''|| req.body.prezzo== null|| req.body.prezzo==''|| req.body.quantita==null || req.body.quantita==''){
        res.json({success: false, message:'Inserisci nome prodotto, descrizione,prezzo e quantità' });
    }else{
        prodotto.save(function(err){
            if (err){
                res.json({success:false, message: 'Oggetto già presente'});
            }else{
                res.json({success: true, message: 'Prodotto inserito!'});
            }
        });
    }
   });


    //Login utente route
    router.post('/autenticazione', function(req, res){
    User.findOne({username: req.body.username}).select('email username password').exec(function(err,user){
        if(err) throw err;

        if(!user){
            res.json({ success: false, message:'Utente non autenticato'});
        }else if (user){
            if(req.body.password) {
                var validPassword=user.comparePassword(req.body.password);
            }else{
                res.json({ success: false, message:'Password non presente'});
            }
            if(!validPassword){
                res.json({ success: false, message:'Password non corretta'});
            }else{
                var token=jwt.sign({ username: user.username, email: user.email},secret,{expiresIn: '24h'});
                res.json({success: true, message:'User autenticato!', token: token });
            }
        }
    });
    });

    router.use(function(req,res,next){
        var token=req.body.token || req.body.query || req.headers['x-access-token'];
       if(token){
           //verifica token
           jwt.verify(token,secret, function(err,decoded){
           if(err) {
            res.json({success: false, message: 'Token non valido'});
           } else {
               req.decoded= decoded;
               next();
           }
           });
       }else{
           res.json({ success: false, message:'No token'});
       }
    });

    router.post('/me', function(req,res){
        res.send(req.decoded);
    });

    router.get('/permission', function(req,res){
      User.findOne({username : req.decoded.username}, function(err, user){
           if(err) throw err;
           if(!user){
               res.json({ success: false, message: 'Nessun utente è stato trovato'});
           }else{
               res.json({ success: true, permission: user.permission});
           }
      });
    });

   router.get('/visualizzautenti', function(req,res){
   User.find({}, function(err, users){
   if(err) throw err;
   User.findOne({username: req.decoded.username}, function(err, mainUser){
   if(err) throw err;
   if(!mainUser){
       res.json({ success: false, message: 'Utente non presente'});
   }else{
       if(mainUser.permission==='admin'||mainUser.permission==="moderator"){
           if(!users){
               res.json({ success: false, message: "Utente non presente"})
           }else{
               res.json({ success: true, users: users,permission: mainUser.permission});
           }

       }else{
       res.json({success: false, message: 'Permessi insufficienti'});
   }
}

   });
   });
   });

   router.delete('/visualizzautenti/:username', function(req,res){
   var deletedUser= req.params.username;
   User.findOne({username: req.decoded.username},function(err,mainUser){
       if(err) throw err;
       if(!mainUser){
           res.json({success: false, message:'User non presente'});
       }else{
           if(mainUser.permission !='admin'){
               res.json({success: false, message:'Permessi Insufficienti'});
           }else{
               User.findOneAndRemove({username:deletedUser},function(err,user){
                   if(err) throw err;
                   res.json({ success: true});
               });
           }
       }
   });
   });

     return router;   
 };