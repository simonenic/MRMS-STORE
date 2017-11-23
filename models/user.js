// get an instance of mongoose and mongoose.Schema
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt =require('bcrypt-nodejs');

// set up a mongoose model and pass it using module.exports
var UserSchema =new Schema({ 
    username    : { type: String , unique: true, required: true, lowercase: true },
    password: {type: String, required:true},
    email: { type: String  , unique: true, required: true, lowercase: true }      
    
});

UserSchema.pre('save', function(next){
var user= this;    
bcrypt.hash(user.password, null, null, function(err,hash){
    if(err) return next(err);
    user.password=hash;
    next();
});

});

UserSchema.methods.comparePassword= function(password){
    return bcrypt.compareSync(password, this.password);
};
module.exports = mongoose.model('User',UserSchema);



