var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt= require('bcrypt-nodejs');
var titlize=require('mongoose-title-case');
var validate=require('mongoose-validator');



  var emailValidator = [
    validate({
     validator: 'isEmail',
     message: 'Email non valida'
    })
   
  ];


  var usernameValidator = [
      validate({
        validator: 'isLength',
        arguments: [3,25],
        message: 'Username deve essere lungo tra 3 caratteri e 25'
    }),
      validate({
         validator:'isAlphanumeric',
         message:'Username può contenere lettere e numeri'
    })
   ];


 var passwordValidator = [
     validate({
        validator: 'matches',
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*[\d])(?=.*?[\W]).{8,35}$/,
        message: ' La password deve contenere 8 caratteri, tra cui una lettera maiuscola, una minuscola, un numero e un carattere speciale'
     }),
    
 ]

var UserSchema= new Schema({
    nome :{type:String,required:true},
    username: {type:String , lowercase: true, required:true,unique:true, validate: usernameValidator},
    password:{ type:String , reuired: true, validate: passwordValidator},
    email: {type:String , required:true,unique:true,lowercase: true, validate: emailValidator},
    permission: {type: String , required: true, default:'user'}
});


UserSchema.pre('save', function(next){
var user=this;
bcrypt.hash(user.password,null,null,function(err,hash){
    if (err) return next(err);
    user.password= hash;
    next();
});
});

UserSchema.plugin(titlize,{
    paths:['nome']
});


UserSchema.methods.comparePassword= function(password){
 return bcrypt.compareSync(password, this.password);
};

module.exports= mongoose.model('User', UserSchema);