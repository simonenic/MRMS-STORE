var User    = require('../models/user.js');
var jwt     =require('jsonwebtoken');
var secret  ='harrypotter';

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
                res.json({ success: false, message:'Password non autenticata'});
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



 
     return router;   
 };