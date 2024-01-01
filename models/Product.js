
const {model, Schema }= require('mongoose')

const productSchema = new Schema({
    userId:{
        type: Schema.Types.ObjectId, 
        ref:'User', 
        required: true
    }, 
    title: {
        type: String, 
        required: [true, 'Product title is required'], 
        trim: true
    }, 
    description: {
        type: String, 
        required: [true, 'Product description is required'], 
        trim: true
    }, 
    price: {
        type: String, 
        required: [true, 'Product price is required'], 
        trim: true
    }, 
    image: {
        type: String, 
        default: 'no-image.jpg'
    }, 
    

}, {timestamps: true})

module.exports = model('Product', productSchema);