var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt= require('bcrypt-nodejs');
var titlize=require('mongoose-title-case');
var validate=require('mongoose-validator');

var nameValidator = [
    validate({
     validator: 'matches',
     arguments: /^(([a-zA-Z]{3,20})+[ ]+([a-zA-Z]{3,20})+)+$/,
     message: 'Il nome deve contenere almeno 3 caratteri,al massimo 30,no caratteri speciali o numeri'
    }),
    validate({
        validator: 'isLength',
        arguments:[3,25],
        message: 'Name should be between {ARGS[0] and Args[1]} characters'
    })
  ];

  var emailValidator = [
    validate({
     validator: 'isEmail',
     message: 'Email non valida'
    }),
    validate({
        validator: 'isLength',
        arguments: [3,25],
        message: 'Email should be between {ARGS[0] and Args[1]} characters'
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
         message:'Username deve contenere lettere e numeri'
    })
   ];


 var passwordValidator = [
     validate({
        validator: 'matches',
        arguments: /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*[\d])(?=.*?[\W]).{8,35}$/,
        message: ' La password deve contenere una lettera grande, una lettera piccola, un numero, un carattere speciale e 8 caratteri'
     }),
     validate({
        validator: 'isLength',
        arguments:[8,35],
        message: 'Password should be between {ARGS[0] and Args[1]} characters'
    })
 ]

var UserSchema= new Schema({
    nome :{type:String,required:true,validate: nameValidator},
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