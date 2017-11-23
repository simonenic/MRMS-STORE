
var User        = require('../models/user.js');

module.exports=function(router){

    //Registrazione utente
    router.post('/users', function(req,res){
    var user= new User();
    user.username= req.body.username;
    user.password= req.body.password;
    user.email= req.body.email;
    if(req.body.username== null || req.body.username=='' || req.body.password==null || req.body.password=='' ||req.body.email==null || req.body.email=='')
    {
        res.json({success: false, message:'Username , email e password mancanti'});
    
    }else{
        user.save(function(err){
            if(err) {
                res.json({success:false,message:'Username o email esistenti'});
            } else{
                res.json({ success: true, message:'user creato'});
            }
        
        });
    }
    });
    // Login utente
    router.post('/autenticazione', function(req, res){
          User.findOne({username: req.body.username}).select('email username password').exec(function(err,user){
              if(err) throw err;
              
              if(!user){
                  res.json({success: false, message: 'Utente non trovato'});
              } else if(user){
                  if(req.body.password) {
                      var validPassword=user.comparePassword(req.body.password);
                    }else{
                        res.json({success: false, message:'Non è stata inserita nessuna password'});
                    }
                  if(!validPassword){
                      res.json({success: false, message:'Password sbagliata'});
                  }else{
                      res.json({success: true, message:' Utente autenticato!'});
                  }
              }
          });
    });
    return router;
}