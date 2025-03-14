import mongoose, { Mongoose } from "mongoose";

const childSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pin: { type: Number, required: true, minlength: 6, maxlength: 6 },
    avatar: { type: String, require: true, },
    parent: { type: mongoose.ObjectId, ref: 'Parent' },

},{timestamps: true})

export default mongoose.model('child',childSchema)