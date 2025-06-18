import mongoose from 'mongoose'

const cartSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: 'true'
    },
    items: [
        {
            productId: {
                type: mongoose.Schema.ObjectId,
                ref: 'Product',
                required: true
            },
            qty: {
                type: Number,
                min: 1,
                required: true,
            }
        }
    ],
    timestamps: true
});

export default mongoose.model('Cart', cartSchema);