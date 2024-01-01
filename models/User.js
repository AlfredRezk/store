const { genSalt, hash, compare } = require('bcryptjs');
const {model, Schema }= require('mongoose')

const userSchema = new Schema({
    firstName: {
        type: String, 
        required: [true, 'First name is required'], 
        trim: true
    }, 
    lastName: {
        type: String, 
        required: [true, 'Lirst name is required'], 
        trim: true
    }, 
    email:{
        type: String, 
        required: [true, 'Email is required'], 
        trim: true, 
        unique: true, 
        match: [/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, 'Provide a valid email']
    }, 
    username: {
        type: String, 
        required: [true, 'Username is required'], 
        trim: true, 
        unique: true, 
    }, 
    password:{
        type: String, 
        required: [true, 'Password is required'], 
        trim: true, 
    },
    image: {
        type: String, 
        default: 'no-image.jpg'
    }, 
    role:{
        type: String, 
        enum: ['user', 'admin', 'seller'], 
        default:'user'
    }, 
    products:[{
        type:Schema.Types.ObjectId, 
        ref:'Product'
    }], 
    cart:{
        type:Schema.Types.ObjectId,
    }

}, {timestamps: true})


// Encrypt password
userSchema.pre('save', async function(next){

    if(!this.isModified('password')) next();
    const salt = await genSalt(12)
    console.log('password:', this.password)
    this.password = await hash(this.password, salt)
    next();
})

// Compare password
userSchema.methods.matchPassword = async function(enteredPassword){
    
    return compare(enteredPassword, this.password)
}
module.exports = model('User', userSchema);