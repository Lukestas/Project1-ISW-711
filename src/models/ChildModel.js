import mongoose from "mongoose"


const ChildSchema = new mongoose.Schema({
    name: { type: String, required: true },
    pin: { type: String, required: true, minlength: 6, maxlength: 6 },
    avatar: { type: String, required: true },
    playlist: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "playlists"
    },
    parent: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Parent',
        required: true
    }
}, { timestamps: true })

export default mongoose.model('Child', ChildSchema);